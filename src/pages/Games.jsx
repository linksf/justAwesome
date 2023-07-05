import { useState, useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { UtilityContext } from "../context/UtilityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlusCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Text, Span } from "../elements/forms.js";
import {
  PageWrapperGrid,
  PageWrapperFlex,
  Section,
  Row,
} from "../elements/layout.js";
import GamePreview from "../components/GamePreview";
import ToolTip from "../elements/ToolTip";
import GameCard from "../components/GameCard";
import GameList from "../components/GameList";

const FormWrapper = styled.div``;
const Form = styled.form`
  padding: 10px;
`;
const Header = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 10px;
  background-color: ${(props) => props.colors.highlightYellow};
`;
const Input = styled.input``;
const Label = styled.label``;
const Button = styled.button``;

const Wrapper = styled(PageWrapperGrid)``;
const Results = styled.div`
  background-color: ${(props) => props.colors.white};
  display: grid;
  grid-template-collumns: 2fr 1fr 1fr 1fr;
  width: 100%;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  color: ${(props) => props.color};
  cursor: pointer;
`;
const GameListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
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
const Games = (props) => {
  const [gameTitleSearch, setGameTitleSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { searchForGameByTitle } = useContext(BoardgameContext);
  const { error, setError, colors, activateToast } = useContext(UtilityContext);

  const handleChange = (e) => {
    setGameTitleSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchForGameByTitle(gameTitleSearch)
      .then((res) => {
        console.log(Array.isArray(res));
        const games = [];
        res.forEach((game) => {
          games.push([game.name, game.year_published, game.primary_publisher]);
        });
        setSearchResults([...games]);
      })
      .catch((err) => {
        setError(err);
      });
  };

  // <PageWrapperFlex direction="row">
  return (
    <>
      <FormWrapper>
        <Form name="gameLookup" onSubmit={handleSubmit}>
          <Label htmlFor="gameTitle">Game title: </Label>
          <Input
            type="text"
            name="gameTitle"
            value={gameTitleSearch}
            onChange={handleChange}
          />
          <Button type="submit">Search</Button>
        </Form>
      </FormWrapper>
      <Section bgcolor={colors.white}>
        <Results>
          {searchResults.map((game) => (
            <>
              <GameInfo bold>{game[0]}</GameInfo>
              <GameInfo>{game[1]}</GameInfo>
              <GameInfo>{game[2]}</GameInfo>
              <GameActions>
                <ToolTip
                  message="Add game to collection"
                  position="top"
                  colors={colors}
                >
                  <Icon
                    color={colors.primary}
                    icon={faPlus}
                    onClick={() => {
                      activateToast("Game added to collection");
                    }}
                  />
                </ToolTip>
                <ToolTip>
                  <Icon
                    color={colors.highlightGreen}
                    icon={faInfoCircle}
                    onClick={() => {
                      activateToast("Game info");
                    }}
                  />
                </ToolTip>
              </GameActions>
            </>
          ))}
        </Results>
      </Section>
    </>
  );
};

//  <GameList>
//               {searchResults.map((game, i) => (
//                 <GameListItem colors={colors} index={i} key={game.id}>
//                   <GameTitle>{game.name}</GameTitle>
//                   <Icon color={colors.primary} icon={faPlus} />
//                 </GameListItem>
//               ))}
//             </GameList>
export default Games;
