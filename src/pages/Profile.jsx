import { useState, useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import colors from "../Utilities/colors";
import ProfilePictureBlank from "../images/profile-picture-blank.svg";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white + "99"};
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  margin: 10px auto;
`;
const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  position: relative;
  left: 10px;
`;
const Name = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;
const GameListTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;
const GameList = styled.div``;
const GameListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Profile = (props) => {
  const { user } = useContext(FirebaseContext);

  return (
    <Wrapper>
      <Row>
        <Image src={ProfilePictureBlank} />
        <Name>{user.displayName}</Name>
      </Row>
      <GameList>
        <GameListTitle>Game Collection</GameListTitle>
        {user.games.length > 0 ? (
          user.games.map((game) => (
            <GameListItem>
              <p>{game.name}</p>
            </GameListItem>
          ))
        ) : (
          <p>No games saved to collection</p>
        )}
      </GameList>
    </Wrapper>
  );
};

export default Profile;
