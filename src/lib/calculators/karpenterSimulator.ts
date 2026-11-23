export interface PodWorkload {
  name: string;
  count: number;
  cpuCores: number;
  ramGiB: number;
}

export interface NodeInstanceType {
  name: string;
  family: string;
  vCpu: number;
  allocatableCpu: number; // after kubelet & systemd reserved
  ramGiB: number;
  allocatableRamGiB: number;
  hourlyPriceOnDemand: number;
  hourlyPriceSpot: number;
}

export const INSTANCE_CATALOG: NodeInstanceType[] = [
  {
    name: "c6i.xlarge",
    family: "Compute",
    vCpu: 4,
    allocatableCpu: 3.82,
    ramGiB: 8,
    allocatableRamGiB: 6.9,
    hourlyPriceOnDemand: 0.17,
    hourlyPriceSpot: 0.065,
  },
  {
    name: "m6i.xlarge",
    family: "General",
    vCpu: 4,
    allocatableCpu: 3.82,
    ramGiB: 16,
    allocatableRamGiB: 14.5,
    hourlyPriceOnDemand: 0.192,
    hourlyPriceSpot: 0.078,
  },
  {
    name: "m6i.2xlarge",
    family: "General",
    vCpu: 8,
    allocatableCpu: 7.75,
    ramGiB: 32,
    allocatableRamGiB: 29.8,
    hourlyPriceOnDemand: 0.384,
    hourlyPriceSpot: 0.155,
  },
  {
    name: "r6i.2xlarge",
    family: "Memory",
    vCpu: 8,
    allocatableCpu: 7.75,
    ramGiB: 64,
    allocatableRamGiB: 60.5,
    hourlyPriceOnDemand: 0.504,
    hourlyPriceSpot: 0.198,
  },
  {
    name: "c6i.4xlarge",
    family: "Compute",
    vCpu: 16,
    allocatableCpu: 15.65,
    ramGiB: 32,
    allocatableRamGiB: 29.8,
    hourlyPriceOnDemand: 0.68,
    hourlyPriceSpot: 0.26,
  },
];

export interface DaemonSetTax {
  cpuCores: number; // e.g. Cilium (0.2) + Datadog (0.2) + Fluentbit (0.1) = 0.5
  ramGiB: number;   // e.g. 1.2 GiB
}

export interface SimulationResult {
  clusterAutoscalerNodes: number;
  clusterAutoscalerMonthlyCost: number;
  clusterAutoscalerCpuWastePercent: number;
  clusterAutoscalerRamWastePercent: number;

  karpenterNodes: { instanceType: string; count: number }[];
  karpenterTotalNodes: number;
  karpenterMonthlyCost: number;
  karpenterMonthlyCostSpot: number;
  karpenterCpuWastePercent: number;
  karpenterRamWastePercent: number;

  monthlyDollarSavingsKarpenter: number;
  annualDollarSavingsKarpenter: number;
}

export function simulateBinPacking(
  workloads: PodWorkload[],
  daemonTax: DaemonSetTax,
  standardInstanceName: string = "m6i.2xlarge"
): SimulationResult {
  // 1. Unroll all pods
  const pods: { cpu: number; ram: number }[] = [];
  workloads.forEach((w) => {
    for (let i = 0; i < w.count; i++) {
      pods.push({ cpu: w.cpuCores, ram: w.ramGiB });
    }
  });

  // Sort pods descending by largest resource (First-Fit Decreasing algorithm)
  pods.sort((a, b) => b.cpu + b.ram - (a.cpu + a.ram));

  const standardInstance =
    INSTANCE_CATALOG.find((i) => i.name === standardInstanceName) || INSTANCE_CATALOG[2];

  // 2. Simulate Cluster Autoscaler (Homogeneous Fixed Node Group)
  const nodeCapacityCpu = Math.max(0.1, standardInstance.allocatableCpu - daemonTax.cpuCores);
  const nodeCapacityRam = Math.max(0.5, standardInstance.allocatableRamGiB - daemonTax.ramGiB);

  interface Bin {
    usedCpu: number;
    usedRam: number;
  }

  const caBins: Bin[] = [];
  for (const pod of pods) {
    let placed = false;
    for (const bin of caBins) {
      if (bin.usedCpu + pod.cpu <= nodeCapacityCpu && bin.usedRam + pod.ram <= nodeCapacityRam) {
        bin.usedCpu += pod.cpu;
        bin.usedRam += pod.ram;
        placed = true;
        break;
      }
    }
    if (!placed) {
      caBins.push({ usedCpu: pod.cpu, usedRam: pod.ram });
    }
  }

  const caNodeCount = Math.max(1, caBins.length);
  const caTotalCpuAllocatable = caNodeCount * standardInstance.vCpu;
  const caTotalRamAllocatable = caNodeCount * standardInstance.ramGiB;
  const totalPodCpu = pods.reduce((acc, p) => acc + p.cpu, 0);
  const totalPodRam = pods.reduce((acc, p) => acc + p.ram, 0);

  const caCpuWastePercent = Math.max(0, Math.round(((caTotalCpuAllocatable - totalPodCpu) / caTotalCpuAllocatable) * 100));
  const caRamWastePercent = Math.max(0, Math.round(((caTotalRamAllocatable - totalPodRam) / caTotalRamAllocatable) * 100));
  const caMonthlyCost = Math.round(caNodeCount * standardInstance.hourlyPriceOnDemand * 730);

  // 3. Simulate Karpenter (Heterogeneous Dynamic Packing)
  // Karpenter chooses right-sized instances from the catalog to minimize slack
  let remainingPods = [...pods];
  const karpenterNodeTally: Record<string, number> = {};
  let karpenterMonthlyCost = 0;
  let karpenterMonthlyCostSpot = 0;
  let karpTotalCpu = 0;
  let karpTotalRam = 0;

  while (remainingPods.length > 0) {
    // Pick the best instance from catalog that fits the current largest pod batch with minimum waste
    let bestInstance = INSTANCE_CATALOG[0];
    let bestFitCount = 0;

    for (const inst of INSTANCE_CATALOG) {
      const availCpu = inst.allocatableCpu - daemonTax.cpuCores;
      const availRam = inst.allocatableRamGiB - daemonTax.ramGiB;
      if (availCpu < remainingPods[0].cpu || availRam < remainingPods[0].ram) continue;

      let testCpu = 0;
      let testRam = 0;
      let fit = 0;
      for (const p of remainingPods) {
        if (testCpu + p.cpu <= availCpu && testRam + p.ram <= availRam) {
          testCpu += p.cpu;
          testRam += p.ram;
          fit++;
        }
      }
      if (fit > bestFitCount) {
        bestFitCount = fit;
        bestInstance = inst;
      }
    }

    // Allocate bestInstance
    const availCpu = bestInstance.allocatableCpu - daemonTax.cpuCores;
    const availRam = bestInstance.allocatableRamGiB - daemonTax.ramGiB;
    let currCpu = 0;
    let currRam = 0;
    const nextRemaining: typeof pods = [];

    for (const p of remainingPods) {
      if (currCpu + p.cpu <= availCpu && currRam + p.ram <= availRam) {
        currCpu += p.cpu;
        currRam += p.ram;
      } else {
        nextRemaining.push(p);
      }
    }

    karpenterNodeTally[bestInstance.name] = (karpenterNodeTally[bestInstance.name] || 0) + 1;
    karpenterMonthlyCost += bestInstance.hourlyPriceOnDemand * 730;
    karpenterMonthlyCostSpot += bestInstance.hourlyPriceSpot * 730;
    karpTotalCpu += bestInstance.vCpu;
    karpTotalRam += bestInstance.ramGiB;

    if (nextRemaining.length === remainingPods.length) {
      // Emergency break for oversized pod
      karpenterNodeTally[standardInstance.name] = (karpenterNodeTally[standardInstance.name] || 0) + 1;
      karpenterMonthlyCost += standardInstance.hourlyPriceOnDemand * 730;
      karpenterMonthlyCostSpot += standardInstance.hourlyPriceSpot * 730;
      break;
    }
    remainingPods = nextRemaining;
  }

  const karpenterNodesList = Object.entries(karpenterNodeTally).map(([instanceType, count]) => ({
    instanceType,
    count,
  }));
  const karpenterTotalNodes = Object.values(karpenterNodeTally).reduce((a, b) => a + b, 0);

  const karpenterCpuWastePercent = Math.max(0, Math.round(((karpTotalCpu - totalPodCpu) / Math.max(1, karpTotalCpu)) * 100));
  const karpenterRamWastePercent = Math.max(0, Math.round(((karpTotalRam - totalPodRam) / Math.max(1, karpTotalRam)) * 100));

  const monthlyDollarSavingsKarpenter = Math.max(0, caMonthlyCost - Math.round(karpenterMonthlyCost));

  return {
    clusterAutoscalerNodes: caNodeCount,
    clusterAutoscalerMonthlyCost: caMonthlyCost,
    clusterAutoscalerCpuWastePercent: caCpuWastePercent,
    clusterAutoscalerRamWastePercent: caRamWastePercent,

    karpenterNodes: karpenterNodesList,
    karpenterTotalNodes,
    karpenterMonthlyCost: Math.round(karpenterMonthlyCost),
    karpenterMonthlyCostSpot: Math.round(karpenterMonthlyCostSpot),
    karpenterCpuWastePercent,
    karpenterRamWastePercent,

    monthlyDollarSavingsKarpenter,
    annualDollarSavingsKarpenter: monthlyDollarSavingsKarpenter * 12,
  };
}
