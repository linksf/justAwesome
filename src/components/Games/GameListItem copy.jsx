import { FirebaseContext } from "../context/FirebaseContext";
import { useContext, useState, useEffect } from "react";
import { UtilityContext } from "../context/UtilityContext";
import { BoardgameContext } from "../context/BoardgameContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ToolTip from "../elements/ToolTip";
import {useNavigate} from "react-router-dom";

const GameListItemWrapper = styled.div`
  padding: 5px 0;
  background-color: ${(props) =>
    props.index % 2 === 0 ? props.colors.highlightYellow : props.colors.white};
  color: ${(props) => props.colors.primary};
`;
const GameInfo = styled.td`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0 5px 0 0;
`;

const GameActions = styled.td``;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  color: ${(props) => props.color};

  &:hover {
    cursor: pointer;
  }
`;
const GameListItem = ({ game, index }) => {
  const { colors } = useContext(UtilityContext);
  const { addGameToCollection } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const goToGame = () => {
    navigate(`/${game.id}`);
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
          <Icon icon={faInfoCircle} color={colors.highlightGreen} onClick={} />
        </ToolTip>
      </GameActions>
    </GameListItemWrapper>
  );
};

export default GameListItem;
