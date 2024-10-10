"use client";
import { EnergyDashboard } from "@/features/energy/containers/energy-dashboard";
import { EnergyContextProvider } from "@/features/energy/context/EnergyContextProvider";

export default function Home({ searchParams }) {
  const clientId = searchParams["client-id"];
  return (
    <EnergyContextProvider>
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full">
        <EnergyDashboard clientId={clientId} />
      </main>
    </EnergyContextProvider>
  );
}
