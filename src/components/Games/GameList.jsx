import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext, useState, useEffect } from "react";
import { UtilityContext } from "../../context/UtilityContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../../elements/ToolTip";
import GameListItem from "./GameListItem";

const GameListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
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
const GameList = (props) => {
  const { games } = props;
  const { colors } = useContext(UtilityContext);
  return (
    <>
      {games.map((game, index) => (
        <GameListItem game={game} key={game.id} index={index} />
      ))}
    </>
  );
};

export default GameList;

// <GameInfo bold>{game.name}</GameInfo>
// <GameInfo>{game.year_published}</GameInfo>
// <GameInfo>{game.primary_publisher}</GameInfo>
// <GameActions>
//   <Icon icon={faPlusCircle} color={colors.primary} />
//   <Icon icon={faInfoCircle} color={colors.highlightGreen} />
// </GameActions>
