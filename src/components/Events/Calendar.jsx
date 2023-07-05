import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../../Utilities/colors";
import { Link } from "react-router-dom";
import ToolTip from "../../elements/ToolTip";
import EventCard from "./EventCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContext } from "../../context/FirebaseContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import { UtilityContext } from "../../context/UtilityContext";

const Calendar = (props) => {
  const { getCurrentUserEvents, user } = useContext(FirebaseContext);
  const { setError, activateToast } = useContext(UtilityContext);
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    const fetchEvents = () => {
      if (!(user && user.events)) return;
      getCurrentUserEvents()
        .then((events) => {
          console.dir(events);
          setEventsList(events);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchEvents();
  }, [user.events]);
  return (
    <>
      {eventsList.length > 0
        ? eventsList.map((event, i) => <EventCard key={i} event={event} />)
        : null}
    </>
  );
};

export default Calendar;
