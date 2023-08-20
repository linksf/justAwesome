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

  const fetchEvents = () => {
    if (!(user && (user.events_hosting || user.events_attending))) return;
    getCurrentUserEvents()
      .then((events) => {
        console.dir(events);
        setEventsList(events);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };
  useEffect(() => {
    fetchEvents();
  }, [user?.events_hosting, user?.events_attending]);
  return (
    <>
      {eventsList && eventsList.length > 0
        ? eventsList.map((event, i) => <EventCard key={i} event={event} />)
        : null}
    </>
  );
};

export default Calendar;
