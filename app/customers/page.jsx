"use client";

import { EnergyContextProvider } from "@/features/energy/context/EnergyContextProvider";
import CustomersContainer from "@/features/customers/containers/CustomersContainer";
export default function CustomersPage() {
  return (
    <EnergyContextProvider>
      <CustomersContainer />
    </EnergyContextProvider>
  );
}
