import { useState, useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../../context/FirebaseContext";
import { UtilityContext } from "../../context/UtilityContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCirclePlus,
  faCircleInfo,
  faCircleQuestion,
  faCircle,
  faEyeCircle,
  faClose
} from "@fortawesome/free-solid-svg-icons";

const GameCardWrapper = styled.div`
  width: 250px;
  height: 300px;
  max-width: 400px;
  max-height: 400px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  width: 100%;
  border-radius: 15px 15px 0 0;
  grid-area: title;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 10px 10px 20px 10px;
  box-sizing: border-box;
  color: ${(props) => props.colors.white};
  background: ${(props) => props.colors.primary};
  text-align: center;
`;

const Thumbnail = styled.img`
  grid-area: img;
  max-width: 150px;
  max-height: 150px;
  margin: 0;
  border-radius: 5px;
`;

const UI = styled.div`
  grid-area: ui;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 20px;
  padding: 10px;
  width: 250px;
  background: ${(props) => props.colors.primary};
  border-radius: 0 0 15px 15px;
  box-sizing: border-box;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${(props) => props.color};
  cursor: pointer;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${(props) => props.color};
  cursor: pointer;
  position: relative;
  top: 5px;
  right: 5px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${(props) => props.colors.black};
  color: ${(props) => props.colors.white};
  cursor: pointer;
`;

const GameCard = (props) => {
  const { gameObj, closer } = props;
  const {
    name,
    yearPublished,
    description,
    thumbnail,
    id,
  } = gameObj;
  const { colors, setError, activateToast } = useContext(UtilityContext);

  return (
    <GameCardWrapper colors={colors}>
      <Title colors={colors}>{name}</Title>
      <Row>
        <Thumbnail src={thumbnail} />
        <div>
          <p>{description}</p>
        </div>
      </Row>
      <UI colors={colors}>
        <Icon color={colors.primary} icon={faCirclePlus} />
        <Icon color={colors.highlightGreen} icon={faCircleInfo} />
        <Icon color={colors.highlightRed} icon={faCircle} />
        <Icon color={colors.highlightYellow} icon={faCircle} />
      </UI>
      <CloseIcon color={colors.highlightRed} icon={faClose} onClick={closer}/>
    </GameCardWrapper>
  );
};

export default GameCard;
