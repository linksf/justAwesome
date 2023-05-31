import {useState, useContext} from "react"
import { Routes, Route, Outlet, Link } from "react-router-dom";
import styled from "styled-components"
import { BoardgameContext } from "./context/BoardgameContext"
import { FirebaseContext } from "./context/FirebaseContext"
import { UtilityContext } from "./context/UtilityContext"
import GamePreview from "./components/GamePreview"
import Home from "./pages/Home"
import Games from "./pages/Games"
import Events from "./pages/Events"
import Profile from "./pages/Profile"
import Toast from "./components/Toast"
import SignInUp from "./components/SignInUp";
import background from "./images/background.png";
import Nav from "./components/Nav";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
    background-image: url(${background});
  background-repeat: repeat;
  background-color: #0055a4;

`
const PageContainer = styled.div`
width: 80%;
  max-width: 600px;
  margin: 50px auto;
  height: 600px;
  overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
const Form = styled.form`

`
const Input = styled.input`

`
const Button = styled.button`

`
const GamesContainer = styled.div`

`

export default function App(){
  const [searchTerm, setSearchTerm] = useState("")
  const {searchForGameByTitle} = useContext(BoardgameContext)
  const {user, userAuth} = useContext(FirebaseContext)
  const {colors, error, setError, TOASTTYPES, activateToast } = useContext(UtilityContext);
  const [gameObjects, setGameObjects] = useState([])
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = ["Home", "Events", "Games", "Profile"];

  const handleChange = (e)=>{
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    searchForGameByTitle(searchTerm).then(res=>{
      console.log(res)
      setGameObjects(res)
    }).catch(err=>console.error(err))
  }
  
   return (
    <Wrapper background={background}>
      <Toast/>
      {userAuth === null ? <SignInUp/> :
      <>
       <Nav activetab={activeTab} setactivetab={setActiveTab} tabs={tabs} />
       
       <PageContainer>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/events" element={<Events />} />
        <Route path="/profile" element={<Profile />} />
       </Routes>
       </PageContainer>
      </>
}
    </Wrapper>
  )
}