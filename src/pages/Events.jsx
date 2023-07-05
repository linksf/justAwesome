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

const Events = (props) => {
  const [state, setState] = useState(null);
  const [currentUserEvents, setCurrentUserEvents] = useState([]);
  const subTabs = [
    {
      text: "View Event Calendar",
      icon: faCalendar,
      action: () => {
        setState("Calendar");
      },
    },
    {
      text: "Search for Events",
      icon: faMagnifyingGlass,
      action: () => {
        setState("Search");
      },
    },
    {
      text: "Manage Your Events",
      icon: faClipboardList,
      action: () => {
        setState("Manage");
      },
    },
    {
      text: "Create a New Event",
      icon: faPlus,
      action: () => {
        setState("Create");
      },
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

  useEffect(() => {
    setSubTabData(subTabs);
    setActiveTab(1);
    return () => {
      setSubTabData([]);
    };
  }, []);

  return (
    <>
      {{
        Calendar: <Calendar />,

        Search: <Search />,

        Manage: <Manage />,

        Create: <Create setstate={setState} />,
      }[state] || <Calendar />}
    </>
  );
};

export default Events;

// <SubNav
//   subtabs={subTabs}
//   activesubtab={activeSubTab}
//   setactivesubtab={setActiveSubTab}
// />
