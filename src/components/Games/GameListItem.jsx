import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext, useState, useEffect } from "react";
import { UtilityContext } from "../../context/UtilityContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../../elements/ToolTip";
import GameCard from "./GameCard copy";
import {useNavigate} from "react-router-dom";

const GameListItemWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 5px;
  background-color: ${(props) =>
    props.index % 2 !== 0 ? "#ecf0f1" : "#ffffff"};
  color: ${(props) => props.colors.primary};
`;

const GameInfo = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const GameActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: ${(props) => props.color};

  &:hover {
    cursor: pointer;
  }
`;

const GameListItem = ({ game, index, search}) => {
  const { colors } = useContext(UtilityContext);
  const { addGameToCurrentUser } = useContext(FirebaseContext);
  const { getGameDataById } = useContext(BoardgameContext);
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);

  const getGameInfo = () => {
    if (!gameData) {
      const data = getGameDataById(game.id)
      console.log(data)
      setGameData(data);
    } else {
      setGameData(null);
    }
  }

  const goToGame = () => {
    const url = `/games/game/${game.id}?search=${search}`;
    console.log(url);
    navigate(url);
  }

  return (
    <GameListItemWrapper index={index} colors={colors}>
      <GameInfo>{game.name}</GameInfo>
      <GameInfo>{game.yearPublished}</GameInfo>
      <GameActions>
        <ToolTip text="Add to collection">
          <Icon icon={faPlusCircle} color={colors.primary}/>
        </ToolTip>
        <ToolTip text="See Details">
        <Icon icon={faInfoCircle} color={colors.highlightGreen} onClick={goToGame} />
        </ToolTip>
      </GameActions>
    </GameListItemWrapper>
  );
};

export default GameListItem;
