import { API_STASTICS_CLIENT_URL } from "@/constants/api.constants";
import { useContext } from "react";
import { ContextEnergy } from "../context/EnergyContextProvider";

export default function useGetStatisticsClient() {
  const { notifyError, notifySuccess } = useContext(ContextEnergy);

  const getStaticsClient = async (
    clientId: number,
    showDetails: boolean = true
  ) => {
    const response = await fetch(
      `${API_STASTICS_CLIENT_URL}/${clientId}?show_details=${showDetails}`
    );
    if (!response.ok) {
      notifyError(`Cliente no existe: Error fetching client statistics`);
      throw new Error(
        `Error fetching client statistics: ${response.statusText}`
      );
    }
    notifySuccess(`Estadisticas obtenidas con exito para el cdi ${clientId}`);
    const data = await response.json();
    return data;
  };

  return {
    getStaticsClient,
  };
}
