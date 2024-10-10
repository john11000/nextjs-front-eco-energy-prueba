"use client";
import { EnergyContextProvider } from "@/features/energy/context/EnergyContextProvider";
import ReportsContainers from "@/features/reports/containers/ReportsContainers";

export default function ReportsPage() {
  return (
    <EnergyContextProvider>
      <ReportsContainers />
    </EnergyContextProvider>
  );
}
