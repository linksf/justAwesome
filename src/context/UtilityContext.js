import { useState, useEffect, createContext } from "react";

export const UtilityContext = createContext();

//create provider
export default function UtilityProvider({ children }) {
  const [colors, setColors] = useState({
    primary: "#0055a4",
    highlightYellow: "#fff000",
    highlightRed: "#f56530",
    highlightGreen: "#00A555",
    white: "#ecf0f1",
    black: "#232323"
})

const SEARCHSCOPES = {
  ALL: "all",
  USER: "user",
  EVENT: "event",
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
      showToast: 1,
      headline: headline,
      message: message,
      type: type,
      duration: duration,
    });
    setTimeout(hideToast, duration);
  };

  const hideToast = () => {
    setToastInfo({
      showToast: 0,
      headline: "",
      message: "",
      type: TOASTTYPES.INFO,
      duration: 0,
    });
  };

  const [subTabData, setSubTabData] = useState([])

const [error, setError] = useState(null);
 const [activeTab, setActiveTab] = useState(0);
useEffect(() => {
  if (error) {
    activateToast({message: error.message, headline: "error", type: TOASTTYPES.ERROR, duration: 3000});
    }}, [error]);

    useEffect(()=>{
      if (toastInfo.showToast) {
      activateToast(toastInfo)
      const timeout = setTimeout(hideToast, 3000);
      return clearTimeout(timeout);
    }
    }, [error]);
  const tabs = ["Home", "Events", "Games", "Profile"];
const value = { colors, error, setError, TOASTTYPES, activateToast, toastInfo, hideToast, SEARCHSCOPES, subTabData, setSubTabData, activeTab, setActiveTab, tabs};
  return (
    <UtilityContext.Provider value={value}>
      {children}
    </UtilityContext.Provider>
  );

}
