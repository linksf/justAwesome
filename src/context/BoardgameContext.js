import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

//create context
export const BoardgameContext = createContext();

//create provider
export default function BoardgameProvider({ children }) {
  const clientId = "usRohsToAJ";
  const baseUrl = "https://api.boardgameatlas.com/api/";
  const searchForGameByTitle = (title) => {
    const URL = `${baseUrl}search?name=${title}&client_id=${clientId}`;
    console.log(URL);
    return axios
      .get(URL)
      .then((res) => res.data.games)
      .catch((err) => {
        console.error(err);
        return null;
      });
  };
  const value = { searchForGameByTitle };
  return (
    <BoardgameContext.Provider value={value}>
      {children}
    </BoardgameContext.Provider>
  );
}
