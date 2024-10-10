import { useContext } from "react";
import { API_POST_UPLOAD } from "../../../constants/api.constants";
import { ContextEnergy } from "../../customers/context/EnergyContextProvider";

export default function usePostUploadFile() {
  const { notifyError, notifySucces } = useContext(ContextEnergy);

  const uploadFile = async (file) => {
    const response = await fetch(API_POST_UPLOAD, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: file,
    });
    if (!response.ok) {
      notifyError("Error subiendo excel");
      throw new Error("Failed to upload file", response.status);
    }
    const data = await response.json();
    notifySucces("Información subida con exito");
    return data;
  };

  return {
    uploadFile,
  };
}
