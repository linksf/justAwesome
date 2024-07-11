import { useState, useContext } from "react";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { BoardgameContext } from "./context/BoardgameContext";
import { FirebaseContext } from "./context/FirebaseContext";
import { UtilityContext } from "./context/UtilityContext";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Toast from "./components/Toast";
import SignInUp from "./components/SignInUp";
import background from "./images/background.png";
import Nav from "./components/Nav";
import colors from "./Utilities/colors";
import Calendar from "./components/Events/Calendar";
import Search from "./components/Events/Search";
import Create from "./components/Events/Create";
import Event from "./pages/Event";
import Game from "./pages/Game";
    
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-image: url(${background});
  background-repeat: repeat;
  background-color: #0055a4;
  background-attachment: fixed;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`
const AppContainer = styled.div`
position: relative;
overflow: auto;
margin: 0 auto;
display: flex;
flex-direction: column;
height: 100vh;
width: 100vw;
justify-content: baseline;
align-items: flex-start;
  //media queries for all common screen sizes
  @media (min-width: 1024px) {
    width: 800px;
  }
  @media (min-width: 768px) {
    width: 600px;
  }
  @media (min-width: 480px) {
    //background-color: ${colors.primary};
  }
`;
const PageContainer = styled.div` 
//width: calc(100vw - 40px);
  //max-width: 600px;
  margin: 40px 0 auto auto;
  //position: relative;
  //top: 50px;
  min-height: calc(100vh - 40px);
  //max-height: 6000px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  //background-color: ${(props) => props.color + "55"};
  flex-direction: column;
  backdrop-filter: blur(5px);
  position: relative;
  `;
const Form = styled.form``;
const Input = styled.input``;
const Button = styled.button``;
const GamesContainer = styled.div``;

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchForGameByTitle } = useContext(BoardgameContext);
  const { user, userAuth } = useContext(FirebaseContext);
  const { subTabData, error, setError, TOASTTYPES, activateToast } = useContext(
    UtilityContext
  );
  const [gameObjects, setGameObjects] = useState([]);
 



  // const handleChange = (e)=>{
  //   const value = e.target.value
  //   setSearchTerm(value)
  // }

  // const handleSubmit = (e)=>{
  //   e.preventDefault()
  //   searchForGameByTitle(searchTerm).then(res=>{
  //     console.log(res)
  //     setGameObjects(res)
  //   }).catch(err=>console.error(err))
  // }

  return (
    <Wrapper background={background}>
      <Toast />
      {userAuth === null ? (
        <SignInUp />
      ) : (
        <AppContainer>
          <Nav/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/games" element={<Games />}/>
              <Route path="/games/:search" element={<Games />}/>
              <Route path="/games/game/:id" element={<Game />} />
              <Route path="/events" element={<Events />}>
                <Route path=":id" element={<Event/>} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="new" element={<Create />} />
                <Route path="search" element={<Search />} />
                </Route>
              
              <Route path="/profile" element={<Profile />} />
            </Routes>
        </AppContainer>
      )}
    </Wrapper>
  );
}
