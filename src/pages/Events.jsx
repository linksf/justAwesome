import { useState, useContext, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCalendar,
  faMagnifyingGlass,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { UtilityContext } from "../context/UtilityContext";
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
import ToolTip from "../elements/ToolTip";
import Calendar from "../components/Events/Calendar";
import Search from "../components/Events/Search";
import Manage from "../components/Events/Manage";
import Create from "../components/Events/Create";
import SubNav from "../components/SubNav";

const EventsWrapper = styled.div`
  height: calc(100vh - 60px);
  position: relative;
  width: 100%;
  backdrop-filter: blur(10px);
`;

const OutletWrapper = styled.div``;
const Events = (props) => {
  const [state, setState] = useState(null);
  const [currentUserEvents, setCurrentUserEvents] = useState([]);
  const subTabs = [
    {
      text: "View Event Calendar",
      icon: faCalendar,
      path: "calendar",
    },
    {
      text: "Search for Events",
      icon: faMagnifyingGlass,
      path: "search",
    },
    {
      text: "Create a New Event",
      icon: faPlus,
      path: "new",
    },
  ];

  const {
    error,
    setError,
    colors,
    activateToast,
    SEARCHSCOPES,
    setSubTabData,
    activeTab,
    setActiveTab,
  } = useContext(UtilityContext);

  return (
    <EventsWrapper>
      <Outlet />
      <SubNav subTabData={subTabs} />
    </EventsWrapper>
  );
};

export default Events;

// <SubNav
//   subtabs={subTabs}
//   activesubtab={activeSubTab}
//   setactivesubtab={setActiveSubTab}
// />
