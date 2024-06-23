import { useState, useContext, useEffect } from "react";
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UtilityContext } from "../context/UtilityContext";
import {
  FormWrapper,
  Form,
  Header,
  Input,
  Label,
  Button,
  Text,
  Span,
  Checkbox,
  Select,
  Option,
} from "../elements/forms.js";

const Game = (props) => {
  const { id } = useParams();
  const { data, setData } = useState(null);
  const { error, setError, colors, activateToast, SEARCHSCOPES } =
    useContext(UtilityContext);
  const { getGameDataById } = useContext(BoardgameContext);

  useEffect(() => {
    const gameData = getGameDataById(id);
    console.log(gameData);
    setData(gameData);
  }, [id]);

  return (
    <>
      (data === null ? null : (
      <Header>
        <h1>{data?.name}</h1>
      </Header>
      <div>
        <image src={data?.thumbnail} alt="game" />
      </div>
      <div>
        <h2>Year Publis hed: {data?.yearPublished}</h2>
        <h2>Min Players: {data?.minPlayers}</h2>
        <h2>Max Players: {data?.maxPlayers}</h2>
      </div>
      <div>
        <p>Description: {data?.description}</p>
      </div>
      ))
    </>
  );
};

export default Game;
