import { useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext.js";
import { BoardgameContext } from "../context/BoardgameContext.js";
import { UtilityContext } from "../context/UtilityContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GameList from "../components/Games/GameList.jsx";
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
import GamePreview from "../components/Games/GamePreview.jsx";
import ToolTip from "../elements/ToolTip.jsx";
import GameCard from "../components/Games/GameCard copy.jsx";
import {useLocation, useParams} from "react-router-dom";

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
  const location = useLocation();
  const [gameTitleSearch, setGameTitleSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [userNameSearch, setUserNameSearch] = useState("");
  const [eventIdSearch, seteventIdSearch] = useState("");
  
  const { error, setError, colors, activateToast, SEARCHSCOPES } =
  useContext(UtilityContext);
  const [searchScope, setSearchScope] = useState(SEARCHSCOPES.ALL);
  const {getGameDataById,
    searchGameByName,
    searchResults,
    setSearchResults,
    searchTerm,
    setSearchTerm, } = useContext(BoardgameContext);
  
  const searchGame = async (gameTitle) => {
    let itemArray = [];
    itemArray = await searchGameByName(gameTitle);
    setSearchResults(itemArray);
  };
  
  // useEffect(() => {
  //   const queryParam = new URLSearchParams(location.search);
  //    const term = queryParam.get("search");
  //    if (term !== null){
  //       const Term = term.replace(/%20/g, "+");
  //       setSearchTerm(Term);
  //     searchGame(searchTerm)
  //    }
  //   }, [location]);

  useEffect(() => {
    if (searchTerm !== "") {
      searchGame(searchTerm);
    }}, []);

  const handleChange = (e) => {
    const name = e.target.name;
    switch (name) {
      case "gameTitle":
        setSearchTerm(e.target.value);
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
    let itemArray = [];
    itemArray = await searchGameByName(searchTerm);
    setSearchResults(itemArray);
    // const data = await getGameData(gameTitleSearch)
    // console.log(data)
  };

  // const fetchGame = async (gameTitle) => {
  //   const xmlData = await fetch(
  //     `http://localhost:8080/https://boardgamegeek.com/xmlapi/search?search=${gameTitle}&page=1&pagesize=10`
  //   );
  //   console.log(xmlData);
  //   // const jsonData = await xmlData.json()
  //   // console.log(jsonData)
  // };
  return (
    <Wrapper>
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
            value={searchTerm}
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
        <GameList search={gameTitleSearch} games={searchResults}/>
      ) : null}
    </Wrapper>
  );
};

export default Games;

// {searchResults.map((game) => {
//   return <GameCard key={game.id} gameobject={game} />;
// })}
