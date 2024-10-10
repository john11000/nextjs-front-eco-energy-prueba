"use client";
import { EnergyDashboard } from "@/features/energy/containers/energy-dashboard";
import { EnergyContextProvider } from "@/features/energy/context/EnergyContextProvider";

export default function Home() {
  return (
    <div className="grid  items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <EnergyContextProvider>
        <main className="flex flex-col row-start-2 items-center sm:items-start w-full">
          <EnergyDashboard />
        </main>
      </EnergyContextProvider>
    </div>
  );
}
