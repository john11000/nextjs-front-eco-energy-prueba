import { ConceptEnum } from "../models/energy.model";
import { API_BASE_URL } from "../../../constants/api.constants";
import { useContext } from "react";
import { ContextEnergy } from "../context/EnergyContextProvider";

export default function usePostCalculateInvoice() {
  const { notifyError, notifySuccess } = useContext(ContextEnergy);

  const postCalculateInvoice = async (
    clientId: number,
    month: number,
    concept?: ConceptEnum
  ) => {
    const url = `${API_BASE_URL}/calculate-invoice/${clientId}/${month}${
      concept ? `/${concept}` : ""
    }`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      notifyError('"Error calculando factura', errorData.message || response.statusText)
      throw new Error(
        `Error creating invoice: ${response.status} - ${
          errorData.message || response.statusText
        }`
      );
    }
    notifySuccess("Factura calculada exitosamente");
    return await response.json();
  };

  return {
    postCalculateInvoice,
  };
}
