import { useContext } from "react";
import { API_BASE_URL } from "./../../../constants/api.constants";
import { ContextEnergy } from "../context/EnergyContextProvider";
export default function useGetSystemLoad() {
  const { notifyError, notifySuccess } = useContext(ContextEnergy);

  const getSystemLoad = async () => {
    const response = await fetch(`${API_BASE_URL}/system-load`);
    if (!response.ok) {
      notifyError(`Error fetching system load: ${response.statusText}`)
      throw new Error(`Error fetching system load: ${response.statusText}`);
    }
    notifySuccess("Carga del sistema cargada exitosamente");
    const data = await response.json();
    return data;
  };

  return {
    getSystemLoad,
  };
}
