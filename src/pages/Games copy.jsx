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
  const [searchResults, setSearchResults] = useState([]);
  const [userNameSearch, setUserNameSearch] = useState("");
  const [eventIdSearch, seteventIdSearch] = useState("");
  
  const { error, setError, colors, activateToast, SEARCHSCOPES } =
  useContext(UtilityContext);
  const [searchScope, setSearchScope] = useState(SEARCHSCOPES.ALL);
  const { getGameData, searchGameByName } = useContext(BoardgameContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemArray = await searchGameByName(gameTitleSearch);
    setSearchResults(itemArray);
    // const data = await getGameData(gameTitleSearch)
    // console.log(data)
  };

  const fetchGame = async (gameTitle) => {
    const xmlData = await fetch(
      `http://localhost:8080/https://boardgamegeek.com/xmlapi/search?search=${gameTitle}&page=1&pagesize=10`
    );
    console.log(xmlData);
    // const jsonData = await xmlData.json()
    // console.log(jsonData)
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
        <GameList games={searchResults}/>
      ) : null}
    </>
  );
};

export default Games;

// {searchResults.map((game) => {
//   return <GameCard key={game.id} gameobject={game} />;
// })}
