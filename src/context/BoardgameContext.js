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

  function searchGameByName(name){
    console.log("searchGameByName", name);
    let parser = new DOMParser
    // const url = `http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/search?query=${name}`;
    const url = `https://www.boardgamegeek.com/xmlapi2/search?query=${name}`;
    let req = new XMLHttpRequest()
    req.open("GET", url, false)
    req.send(null)
    let text = req.responseText
    let xmlDoc = parser.parseFromString(text, "text/xml")
    let totalResults = xmlDoc.querySelector("items").getAttribute("total")
    let items = xmlDoc.querySelectorAll("item")
    let itemArray = []
    items.forEach((item=>{
      const itemObj = {}
      itemObj.name = item.querySelector("name").getAttribute("value")
      itemObj.id = item.getAttribute("id")
      itemObj.yearPublished = item.querySelector("yearpublished")?.getAttribute("value")
      itemArray.push(itemObj)
    }))
    return itemArray
  }

  function getGameDataById(id) {
    let parser, xmlDoc, html, htmlParser, htmlDoc;
    console.log("getGameData", id);
    const url = `https://boardgamegeek.com/xmlapi/boardgame/${id}`;
    let req = new XMLHttpRequest();
    req.open(
      "GET",
      url,
      false
    );
    req.send(null);
    let text = req.responseText;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");
    html = xmlDoc.querySelector("description").textContent
    htmlParser = new DOMParser()
    htmlDoc = htmlParser.parseFromString(html, "text/html")
    const gameObj = {
      name: null,
      id: null, 
      year: null,
      minPlayers: null,
      maxPlayers: null,
      playTime: null,
      description: htmlDoc.body.textContent,
      thumbnail: null,
      image: null,
      age: null
    };
      gameObj.name = xmlDoc.querySelector('name[primary="true"]')?.textContent ?? null
      gameObj.year = xmlDoc.querySelector('yearpublished')?.textContent ?? null
      gameObj.minPlayers = xmlDoc.querySelector('minplayers')?.textContent ?? null
      gameObj.maxPlayers = xmlDoc.querySelector('maxplayers')?.textContent ?? null
      gameObj.age = xmlDoc.querySelector('age')?.textContent ?? null
      gameObj.playTime = xmlDoc.querySelector('playingtime')?.textContent ?? null
      gameObj.id = xmlDoc.querySelector('item')?.getAttribute("id") ?? null
      gameObj.thumbnail = xmlDoc.querySelector('thumbnail')?.textContent ?? null
      gameObj.image = xmlDoc.querySelector('image')?.textContent ?? null
    // console.log(xmlDoc.getElementsByTagName("name")[0].getAttribute("value"));
  return gameObj;
  }

  //   fetch(url)
  //     .then((response) => {
  //       console.log("response", response.body.getReader());
  //       if (response.ok) {
  //         const ptext = parser.parse(response.text());
  //         setState(ptext);
  //         return ptext;
  //       } else {
  //         console.error("Error:", error);
  //         setError({ message: response.statusText, type: TOASTTYPES.ERROR });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       setError({ message: error.message, type: TOASTTYPES.ERROR });
  //     });
  // }

  const value = { getGameDataById, searchGameByName };

  return (
    <BoardgameContext.Provider value={value}>
      {children}
    </BoardgameContext.Provider>
  );
};

export default BoardgameProvider;
