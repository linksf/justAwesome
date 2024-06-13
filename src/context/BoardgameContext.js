import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { FirebaseContext } from "./FirebaseContext";
import { UtilityContext } from "./UtilityContext";
import { XMLParser } from "fast-xml-parser";

//create context
export const BoardgameContext = createContext();

//create provider

const BoardgameProvider = ({ children }) => {
  const { error, setError, TOASTTYPES, activateToast } =
    useContext(UtilityContext);
  const [state, setState] = useState(null);

  function getGameData(name) {
    console.log("getGameData", name);
    const url = `https://boardgamegeek.com/xmlapi/search?search=` + name;
    const parser = new XMLParser();
    fetch(url, { mode: "no-cors" })
      .then((response) => {
        console.log("response", response);
        if (response.ok) {
          const ptext = parser.parse(response.text());
          setState(ptext);
          return ptext;
        } else {
          console.error("Error:", error);
          setError({ message: response.statusText, type: TOASTTYPES.ERROR });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError({ message: error.message, type: TOASTTYPES.ERROR });
      });
  }

  const value = { getGameData };

  return (
    <BoardgameContext.Provider value={value}>
      {children}
    </BoardgameContext.Provider>
  );
};

export default BoardgameProvider;
