import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

//create context
export const UtilityContext = createContext();

//create provider
export default function UtilityProvider({ children }) {
  const colors = {
    primary: "#0055a4",
    highlightYellow: "#fff000",
    highlightRed: "#f56530",
    highlightGreen: "#00A555",
    white: "#ecf0f1",
    black: "#232323"
}
const TOASTTYPES = {
  INFO: colors.primary,
  WARNING: colors.highlightYellow,
  ERROR: colors.highlightRed,
  SUCCESS: colors.highlightGreen,
};

  const [toastInfo, setToastInfo] = useState({
    showToast: false,
    headline: "",
    message: "",
    type: TOASTTYPES.INFO,
    duration: 3000,
  });
  

  const activateToast = ({headline, message, type, duration}) => {
    setToastInfo({
      showToast: true,
      headline: headline,
      message: message,
      type: type,
      duration: duration,
    });
  };

  const hideToast = () => {
    setToastInfo({
      showToast: false,
      headline: "",
      message: "",
      type: TOASTTYPES.INFO,
      duration: 3000,
    });
  };

const [error, setError] = useState(null);

useEffect(() => {
  if (error) {
    activateToast({message: error.message, headline: "error", type: TOASTTYPES.ERROR, duration: 3000});
    }}, [error]);
    
const value = { colors, error, setError, TOASTTYPES, activateToast, toastInfo, hideToast};
  return (
    <UtilityContext.Provider value={value}>
      {children}
    </UtilityContext.Provider>
  );

}
