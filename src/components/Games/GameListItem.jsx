import { FirebaseContext } from "../../context/FirebaseContext";
import { useContext, useState, useEffect } from "react";
import { UtilityContext } from "../../context/UtilityContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../../elements/ToolTip";

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
const GameListItem = ({ game, index }) => {
  const { name, yearPublished, id } = game;
  const { colors } = useContext(UtilityContext);
  const { addGameToCurrentUser } = useContext(FirebaseContext);
  return (
    <GameListItemWrapper colors={colors} index={index}>
      <GameInfo bold={1}>{name}</GameInfo>
      <GameInfo>{yearPublished}</GameInfo>
      <GameActions>
        <Icon
          icon={faPlusCircle}
          color={colors.primary}
          onClick={() => {
            addGameToCurrentUser(game);
          }}
        />
        <Icon icon={faInfoCircle} color={colors.highlightGreen} />
      </GameActions>
    </GameListItemWrapper>
  );
};

export default GameListItem;
