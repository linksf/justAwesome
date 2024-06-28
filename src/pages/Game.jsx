import { useState, useContext, useEffect } from "react";
import { Routes, Route, Outlet, Link, useParams, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../elements/ToolTip";
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

const GameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
  color: #ecf0f1;
  padding: 15px;
  overflow: scroll;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: ${(props) => props.color};
  &:hover {
    cursor: pointer;
  }
`;

const Game = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const { error, setError, colors, activateToast, SEARCHSCOPES } =
    useContext(UtilityContext);
  const { getGameDataById } = useContext(BoardgameContext);
  const { addGameToCurrentUser } = useContext(FirebaseContext);

  useEffect(() => {
   const queryParam = new URLSearchParams(location.search);
    const searchTerm = queryParam.get("search");
    setSearchTerm(searchTerm);
  }, [location]);

  useEffect(() => {
    const gameData = getGameDataById(id);
    console.log(gameData);
    setData(gameData);
  }, [id]);

  const returnToSearch = () => {
    if (searchTerm) {
      navigate(`/games/${searchTerm}`);
    } else {
      navigate("/games")
    }
  }

  return (
    <GameWrapper>
      <Row>
        <Button onClick={returnToSearch}>Back</Button>
        <Button onClick={(e)=>addGameToCurrentUser(data)}>Add to Collection</Button>
      </Row>
      <Header>
        <h1>{data?.name}</h1>
      </Header>
      <Row>
        <div>
          <img src={data?.thumbnail} alt="game"/>
        </div>
        <div>
          <h2>Year Published: {data?.yearPublished}</h2>
          <h2>Min Players: {data?.minPlayers}</h2>
          <h2>Max Players: {data?.maxPlayers}</h2>
          <h2>Age: {data?.age}+</h2>
        </div>
      </Row>
      <div>
        <p>Description: {data?.description}</p>
      </div>
    </GameWrapper>
  );
};

export default Game;
