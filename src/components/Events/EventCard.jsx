import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../Utilities/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faLocationPin,
  faClock,
  faPen,
  faGear,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FirebaseContext } from "../../context/FirebaseContext";
import { UtilityContext } from "../../context/UtilityContext";

//styled components for EventCard component containing event information
const CardWrapper = styled.div`
  width: 650px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #ffffff99;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  margin: 10px auto;
  font-family: "Roboto", sans-serif;
`;
const CalendarIcon = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  justify-content: stretch;
  align-items: stretch;
  box-shadow: 1px 1px 2px 1px #00000099;
  padding: 0px;
  margin: 10px;
  border-radius: 5px 5px 0 0;
`;

const Month = styled.div`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: ${({ bgcolor }) => bgcolor};
  border-radius: 5px 5px 0 0;
  height: 20px;
  margin: 0;
`;
const Date = styled.div`
  width: 100%;
  text-align: center;
  background-color: white;
  color: black;
  font-size: 1.25rem;
  height: 100%;
  vertical-align: middle;
  line-height: 1.25rem;
  padding-top: 0.5rem;
`;

const EventCardBody = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  margin: 5px;
  grid-template-columns: 2fr 1fr;
`;
const EventTitle = styled.p`
  text-align: left;
  grid-column: 1/2;
  padding: 0px 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 1.5rem;
  cursor: pointer;
`;
const EventLocation = styled.p`
  grid-column: 1/2;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 0.8rem;
`;
const EventTime = styled.p`
  grid-column: 1/2;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 0.8rem;
`;
const EventCardActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  grid-column: 2/3;
  grid-row: 1/4;
`;
const ActionIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  margin: 5px;
  cursor: pointer;
`;
const EventDate = styled.h3``;
const EventDescription = styled.p``;
const EventAttendees = styled.p``;
const EventCard = ({ event, isexpanded }) => {
  const { isCurrentUserHost, user, userDocRef } = useContext(FirebaseContext);
  const {
    id,
    name,
    dateObject,
    startTime,
    endTime,
    street,
    city,
    state,
    zip,
    description,
    attendees,
    games,
    host,
  } = event;
  const { month, day, date, year } = dateObject;
  const navigate = useNavigate();
  const editEvent = () => {
    navigate("/events/" + id);
  };

  const isUserHost = () => userDocRef.id == host.id;

  return (
    <CardWrapper>
      <CalendarIcon>
        <Month bgcolor={colors.highlightRed}>{month}</Month>
        <Date>{date}</Date>
      </CalendarIcon>
      <EventCardBody>
        <EventTitle onClick={(e)=>navigate(`/events/${id}`)}>{name}</EventTitle>
        <EventLocation>{`${street} ${city}`}</EventLocation>
        <EventTime>{`${startTime} - ${endTime}`}</EventTime>
        <EventCardActions>
          {isUserHost() ? (
            <ActionIcon icon={faPen} onClick={editEvent} />
          ) : null}
          <ActionIcon icon={faEnvelope} />
        </EventCardActions>
      </EventCardBody>
    </CardWrapper>
  );
};

export default EventCard;
