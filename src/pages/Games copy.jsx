import { useState, useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { UtilityContext } from "../context/UtilityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GameList from "../components/Games/GameList";
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
import {
  PageWrapperGrid,
  PageWrapperFlex,
  Section,
} from "../elements/layout.js";
import GamePreview from "../components/Games/GamePreview";
import ToolTip from "../elements/ToolTip";
import GameCard from "../components/Games/GameCard copy";

const Wrapper = styled.div`
  overflow-y: scroll;
`;
const Results = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Icon = styled(FontAwesomeIcon)``;
const Games = (props) => {
  const [gameTitleSearch, setGameTitleSearch] = useState("");
  const { error, setError, colors, activateToast, SEARCHSCOPES } = useContext(
    UtilityContext
  );
  const [searchScope, setSearchScope] = useState(SEARCHSCOPES.ALL);
  const [searchResults, setSearchResults] = useState([]);
  const { searchForGameByTitle } = useContext(BoardgameContext);
  const [userNameSearch, setUserNameSearch] = useState("");
  const [eventIdSearch, seteventIdSearch] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    switch (name) {
      case "gameTitle":
        setGameTitleSearch(e.target.value);
        break;
      case "userName":
        setUserNameSearch(e.target.value);
        break;
      case "eventId":
        seteventIdSearch(e.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data =
      searchScope === SEARCHSCOPES.ALL
        ? null
        : searchScope === SEARCHSCOPES.USER
        ? userNameSearch
        : eventIdSearch;
    searchForGameByTitle(gameTitleSearch, searchScope, data)
      .then((res) => {
        const games = [];
        console.log(res);
        res.forEach((game) => {
          games.push({
            name: game?.name,
            id: game?.id,
            year_published: game?.year_published,
            primary_publisher: game?.primary_publisher?.name,
          });
        });
        console.log(games);
        setSearchResults(games);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  return (
    <>
      <Section bgcolor={colors.white}>
        <Form
          templatecolumns="repeat(6, 1fr)"
          name="gameLookup"
          onSubmit={handleSubmit}
        >
          {/* <Header>Search for game</Header> */}
          <Label column="1/2" htmlFor="gameTitle">
            Game title
          </Label>
          <Input
            column="2/4"
            type="text"
            name="gameTitle"
            value={gameTitleSearch}
            onChange={handleChange}
          />
          <Label column="4/5" htmlFor="searchScope">
            Search scope
          </Label>
          <Select
            column="5/7"
            name="searchScope"
            onChange={(e) => setSearchScope(e.target.value)}
          >
            <Option value={SEARCHSCOPES.ALL}>Game Database</Option>
            <Option value={SEARCHSCOPES.USER}>User</Option>
            <Option value={SEARCHSCOPES.EVENT}>Event</Option>
          </Select>
          {searchScope === SEARCHSCOPES.USER ? (
            <>
              <Label column="1/2" htmlFor="userName">
                User
              </Label>
              <Input
                column="2/4"
                type="text"
                name="userName"
                onChange={handleChange}
                value={userNameSearch}
              />
            </>
          ) : searchScope === SEARCHSCOPES.EVENT ? (
            <>
              <Label column="1/2" htmlFor="event">
                Event ID
              </Label>
              <Input
                column="2/4"
                type="text"
                name="eventId"
                onChange={handleChange}
                value={eventIdSearch}
              />
            </>
          ) : null}
          <Button column="5/7" type="submit">
            Search
          </Button>
        </Form>
      </Section>
      {searchResults.length > 0 ? (
        <Results>
          <GameList games={searchResults} />
        </Results>
      ) : null}
    </>
  );
};

export default Games;

// {searchResults.map((game) => {
//   return <GameCard key={game.id} gameobject={game} />;
// })}
