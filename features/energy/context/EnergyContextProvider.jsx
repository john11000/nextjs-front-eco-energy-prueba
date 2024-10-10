import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ContextEnergy = createContext();

export const EnergyContextProvider = ({ children }) => {
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };
  return (
    <ContextEnergy.Provider
      value={{
        notifySuccess,
        notifyError,
      }}
    >
      <ToastContainer />
      {children}
    </ContextEnergy.Provider>
  );
};
