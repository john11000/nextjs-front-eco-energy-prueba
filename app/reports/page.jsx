"use client";
import { EnergyContextProvider } from "@/features/energy/context/EnergyContextProvider";

export default function ReportsPage() {
  return (
    <EnergyContextProvider>
      <div>Reports</div>
    </EnergyContextProvider>
  );
}
