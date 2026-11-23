export interface NatAuditInputs {
  azCount: 1 | 2 | 3;
  natDeployMode: "single-shared" | "one-per-az" | "fck-nat-instance";
  monthlyInternetEgressGB: number; // to public internet
  monthlyS3TransferGB: number;     // backups, logs, models
  monthlyEcrPullGB: number;        // container deployments
  crossAzTrafficGB: number;        // microservices calling across AZs
  hasS3GatewayEndpoint: boolean;
  hasEcrInterfaceEndpoint: boolean;
}

export interface NatAuditResults {
  natHourlyFee: number;
  natDataProcessingFee: number;
  internetEgressFee: number;
  crossAzFee: number;
  vpcEndpointFees: number;
  totalMonthlyCost: number;
  optimizedMonthlyCost: number;
  monthlySavings: number;
  findings: {
    severity: "critical" | "warning" | "optimal";
    title: string;
    description: string;
    potentialSavings: number;
  }[];
  terraformRecommendation: string;
}

export function auditNatGatewayCosts(inputs: NatAuditInputs): NatAuditResults {
  // AWS US-East-1 baseline rates
  const NAT_HOURLY_RATE = 0.045; // $0.045/hour = ~$32.85/mo per NAT GW
  const NAT_DATA_PROCESSING_RATE = 0.045; // $0.045 per GB processed by NAT
  const INTERNET_EGRESS_RATE = 0.09; // $0.09 per GB
  const CROSS_AZ_RATE = 0.01; // $0.01 per GB in each direction ($0.02 roundtrip)
  const VPC_INTERFACE_ENDPOINT_HOURLY = 0.01; // $0.01/hr per AZ + $0.01/GB data

  const hoursPerMonth = 730;
  let natInstanceCount = inputs.natDeployMode === "single-shared" ? 1 : inputs.azCount;
  if (inputs.natDeployMode === "fck-nat-instance") {
    natInstanceCount = inputs.azCount;
  }

  // 1. NAT Hourly base
  let natHourlyFee = 0;
  if (inputs.natDeployMode === "fck-nat-instance") {
    // t4g.nano instance: ~$3.06/month per AZ
    natHourlyFee = 3.06 * natInstanceCount;
  } else {
    natHourlyFee = natInstanceCount * NAT_HOURLY_RATE * hoursPerMonth;
  }

  // 2. Data routed through NAT
  // If S3 Gateway Endpoint is missing, S3 traffic flows through NAT!
  let s3ThroughNat = inputs.hasS3GatewayEndpoint ? 0 : inputs.monthlyS3TransferGB;
  let ecrThroughNat = inputs.hasEcrInterfaceEndpoint ? 0 : inputs.monthlyEcrPullGB;
  let totalDataThroughNat = inputs.monthlyInternetEgressGB + s3ThroughNat + ecrThroughNat;

  // fck-nat does not have $0.045/GB data processing fees!
  let natDataProcessingFee =
    inputs.natDeployMode === "fck-nat-instance" ? 0 : totalDataThroughNat * NAT_DATA_PROCESSING_RATE;

  // 3. Internet Egress fee (AWS still charges $0.09/GB egress to public IP)
  let internetEgressFee = inputs.monthlyInternetEgressGB * INTERNET_EGRESS_RATE;

  // 4. Cross-AZ traffic
  // If using single shared NAT gateway across multiple AZs, traffic from other AZs incurs cross-AZ fee to reach the NAT!
  let crossAzToNat = 0;
  if (inputs.natDeployMode === "single-shared" && inputs.azCount > 1) {
    // Fraction of traffic from other AZs
    const otherAzFraction = (inputs.azCount - 1) / inputs.azCount;
    crossAzToNat = totalDataThroughNat * otherAzFraction * CROSS_AZ_RATE * 2; // both ways
  }
  let crossAzFee = inputs.crossAzTrafficGB * CROSS_AZ_RATE * 2 + crossAzToNat;

  // 5. Interface Endpoint costs (ECR)
  let vpcEndpointFees = 0;
  if (inputs.hasEcrInterfaceEndpoint) {
    // 2 endpoints (ecr.api and ecr.dkr) across azCount
    vpcEndpointFees = 2 * inputs.azCount * VPC_INTERFACE_ENDPOINT_HOURLY * hoursPerMonth + inputs.monthlyEcrPullGB * 0.01;
  }

  const totalMonthlyCost =
    natHourlyFee + natDataProcessingFee + internetEgressFee + crossAzFee + vpcEndpointFees;

  // Optimized baseline calculation:
  // - S3 Gateway Endpoint enabled (100% free)
  // - Clean Cross-AZ topology
  // - Appropriate NAT mode
  const findings: NatAuditResults["findings"] = [];

  // Finding 1: S3 Gateway Endpoint
  if (!inputs.hasS3GatewayEndpoint && inputs.monthlyS3TransferGB > 0) {
    const s3NatWaste = inputs.monthlyS3TransferGB * NAT_DATA_PROCESSING_RATE;
    findings.push({
      severity: "critical",
      title: "Missing Free S3 Gateway VPC Endpoint",
      description: `Routing ${inputs.monthlyS3TransferGB.toLocaleString()} GB of S3 traffic through NAT Gateway incurs AWS processing fees. S3 Gateway Endpoints are 100% free with zero data processing charge.`,
      potentialSavings: Math.round(s3NatWaste),
    });
  }

  // Finding 2: Single NAT vs Multi-AZ Cross-AZ trap
  if (inputs.natDeployMode === "single-shared" && inputs.azCount > 1 && totalDataThroughNat > 500) {
    findings.push({
      severity: "warning",
      title: "Cross-AZ Inter-Subnet Hairpinning Penalty",
      description: `Instances in AZ-${inputs.azCount} are hair-pinning traffic through AZ-1 NAT Gateway, adding $0.02/GB cross-AZ penalty on all egress and risking single-AZ downtime.`,
      potentialSavings: Math.round(crossAzToNat),
    });
  }

  // Finding 3: fck-nat evaluation for high-bandwidth or dev environments
  if (inputs.natDeployMode !== "fck-nat-instance" && totalDataThroughNat > 2000) {
    const fckNatSavings = natDataProcessingFee + (natHourlyFee - 3.06 * inputs.azCount);
    findings.push({
      severity: "warning",
      title: "High NAT Data Processing Overhead",
      description: `AWS charges $0.045/GB solely to inspect packets. Switching to open-source fck-nat (t4g.nano) or VPC Endpoints eliminates the per-GB processing fee completely.`,
      potentialSavings: Math.round(fckNatSavings),
    });
  }

  const potentialSavingsSum = findings.reduce((acc, f) => acc + f.potentialSavings, 0);
  const optimizedMonthlyCost = Math.max(10, totalMonthlyCost - potentialSavingsSum);
  const monthlySavings = Math.max(0, totalMonthlyCost - optimizedMonthlyCost);

  const terraformRecommendation = `# Free AWS S3 Gateway Endpoint (Eliminates NAT processing fee)
resource "aws_vpc_endpoint" "s3" {
  vpc_id          = var.vpc_id
  service_name    = "com.amazonaws.\${var.aws_region}.s3"
  route_table_ids = var.private_route_table_ids
  tags = {
    Name = "devopskit-free-s3-endpoint"
  }
}`;

  return {
    natHourlyFee: Math.round(natHourlyFee),
    natDataProcessingFee: Math.round(natDataProcessingFee),
    internetEgressFee: Math.round(internetEgressFee),
    crossAzFee: Math.round(crossAzFee),
    vpcEndpointFees: Math.round(vpcEndpointFees),
    totalMonthlyCost: Math.round(totalMonthlyCost),
    optimizedMonthlyCost: Math.round(optimizedMonthlyCost),
    monthlySavings: Math.round(monthlySavings),
    findings,
    terraformRecommendation,
  };
}
