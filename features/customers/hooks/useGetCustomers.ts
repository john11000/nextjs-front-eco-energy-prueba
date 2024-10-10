import { API_GET_CUSTOMERS } from "@/constants/api.constants";
import { ContextEnergy } from "@/features/energy/context/EnergyContextProvider";
import { useContext } from "react";

export default function useGetCustomers() {
  const { notifyError, notifySuccess } = useContext(ContextEnergy);

  const getCustomers = async (
   
  ) => {
    const response = await fetch(
      `${API_GET_CUSTOMERS}`
    );
    if (!response.ok) {
      notifyError(`Error al obtener el listado de clientes`);
      throw new Error(
        `Error fetching useGetCustomers: ${response.statusText}`
      );
    }
    const data = await response.json();
    notifySuccess(`Clientes obtenidos con exito`);

    return data;
  };

  return {
    getCustomers,
  };
}
