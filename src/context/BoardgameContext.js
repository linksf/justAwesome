import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { FirebaseContext } from "./FirebaseContext";
import { UtilityContext } from "./UtilityContext";

//create context
export const BoardgameContext = createContext();

//create provider


const BoardgameProvider = ({ children }) => {
  const { error, setError, TOASTTYPES, activateToast } = useContext(
    UtilityContext
  );

  const clientId = "usRohsToAJ";
  const baseUrl = "https://api.boardgameatlas.com/api/";

  const searchForGameByTitle = (title, scope, data) => {
    
    const URL = `${baseUrl}search?name=${title}&client_id=${clientId}`;
    console.log(URL);
    return axios
      .get(URL)
      .then((res) => res.data.games)
      .catch((err) => {
        setError(err);
        return null;
      });
  };

  const value = { searchForGameByTitle };

  return (
    <BoardgameContext.Provider value={value}>
      {children}
    </BoardgameContext.Provider>
  );
};

export default BoardgameProvider;
