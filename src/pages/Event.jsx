import { useState, useContext, useEffect } from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
  redirect,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { faPlus, faPen, faUserPlus } from "@fortawesome/free-solid-svg-icons";
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
import SubNav from "../components/SubNav";
import colors from "../Utilities/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "../components/Users/UserCard";
import Invite from "../components/Events/Invite";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  //background-color: #ffffff80;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: ${colors.white};
`;
const Title = styled.h1`
  /* color: ${colors.black}; */
  padding: 0;
  text-align: center;
  line-height: 50px;
  vertical-align: bottom;
  position: relative;
  text-transform: uppercase;
  margin: 20px auto 5px auto;
  overflow: scroll;
  width: 100%;

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background: ${colors.white};
    left: 0;
    position: absolute;
  }
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background: ${colors.white};
    right: 0;
    bottom: 0;
    position: absolute;
  }
`;

const Info = styled.h2`
  text-align: center;
  font-size: 15px;
  margin-bottom: 15px;
`;

const DescriptionIntro = styled.span`
  font-weight: bold;
  padding: 0 10px 5px 0;
  display: block;
  text-align: center;
`;
const Description = styled.p`
  padding: 10px;
  margin: 5px;
  min-height: 140px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  /* height: 100px; */
  width: 100%;
  margin: 20px auto;
`;
const Atendance = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  min-height: 200px;
`;
const AttendeeList = styled.div`
  width: 70%;
  border: 1px solid ${colors.black};
  border-radius: 10px;
`;
const AttendeeListHeader = styled.p`
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 5px auto;
`;
const Attendee = styled.p``;
const GameList = styled.div`
  grid-column: 1/4;
`;
const Game = styled.p``;
const Actions = styled.div`
  grid-column: 4/5;
`;
const Icon = styled(FontAwesomeIcon)`
  color: ${({ color }) => color || colors.white};
  cursor: pointer;
`;

const InviteWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
`;

const InviteRequest = styled.div`
  width: 300px;
`;
const InviteIntro = styled.p`
  color: ${({ color }) => color || colors.white};
  padding: 15px auto;
  margin: 15px auto;
  font-weight: bold;
  font-size: 1.5em;
  text-align: ${({ align }) => align || "left"};
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InviteRequestButton = styled.button`
  background-color: ${({ bgColor }) => bgColor || colors.white};
  color: ${({ color }) => color || colors.black};
  padding: 5px;
`;

const Event = () => {
  const { id } = useParams();
  const { error, setError, colors, activateToast, SEARCHSCOPES } = useContext(
    UtilityContext
  );
  const { getEventById, user, isCurrentUserHost, userDocRef } = useContext(
    FirebaseContext
  );
  const [state, setState] = useState({});
  const [editable, setEditable] = useState(false);
  const [eventAccessable, setEventAccessable] = useState(false);
  const [inviteVisable, setInviteVisable] = useState(false);
  const navigate = useNavigate();

  const getEvent = async () => {
    let event
    try {
      event = await getEventById(id)
      if (event === undefined) {
        navigate("/events");
        return;
      }
      else {setEventAccessable(true)}
      const editable = userDocRef.id === event.host.id;
      //const editable = true;
      const eventInfo = { ...event, editable: editable };
      setState(eventInfo);
      return eventInfo;
    } catch (err) {
      setError(err);
    }
  };

  const invite = () => {
    setInviteVisable(true);
  };
  
  const closeInvite = () => {
    setInviteVisable(false);
  };

  useEffect(() => {
    getEvent();
  }, [id]);

  const seeMyEvents = () => {
    navigate("/events/calendar");
  };


  const editEvent = () => {};
  return (
    <>
      {eventAccessable ? (
        <Wrapper>
          {inviteVisable ? <Invite event={state} close={closeInvite} /> : null}
          <ImageContainer>
            <Image src={state?.image} alt="image of game" />
          </ImageContainer>
          <Title>{state?.name}</Title>
          <Info>{`${state?.dateObject?.day}, ${state?.dateObject?.month} ${state?.dateObject?.date} ${state?.dateObject?.year} | ${state?.street} ${state?.city}, ${state.state} ${state.zip}`}</Info>
          <Description>
          <DescriptionIntro>About the Event</DescriptionIntro>
            {state?.description}
            </Description>
          <Atendance>
            <AttendeeList>
              {state?.attendees?.length
                ? state?.attendees?.map((attendee) => (
                    <UserCard key={attendee.id} userObject={attendee}/>
                  ))
                : null}
            </AttendeeList>
            <Actions>
              <Icon icon={faUserPlus} onClick={invite} />
              <Icon icon={faPen} onClick={(e) => console.log(e)} />
            </Actions>
          </Atendance>
        </Wrapper>
      ) : (
        <InviteWrapper>
          <InviteRequest>
            <InviteIntro>
                Looks like you haven't been invited yet.
            </InviteIntro>
            <InviteIntro align="right">
                I'm sure it was an accidental oversight!
            </InviteIntro>
            <ButtonWrapper>
              <InviteRequestButton>Request an invitation</InviteRequestButton>
              <InviteRequestButton onClick={seeMyEvents}>
                See my events
              </InviteRequestButton>
            </ButtonWrapper>
          </InviteRequest>
        </InviteWrapper>
      )}
    </>
  );
};
/*
{ 
 
name: string, 
        id: string,
        description: string, 
        image: string, 
        startTime: date, 
        endTime: date, 
        location: string, 
        attendees: [ 
            {
                person: reference, 
                status: string 
            } 
        ] 
        games: [ 
            { 
                name: string, 
                description: string, 
                minPlayers: number, 
                maxPlayers: number, 
                minPlayTime: number, 
                maxPlayTime: number, 
                minAge: number, 
                owner: reference,
                <startTime: date>,
                <players: [reference]>,
                <votes: number>,
            } 
        ], 
        host: reference, 
        options: { 
            allowGameScheduling: boolean, 
            allowGameVoting: boolean, 
            allowGameVoting: boolean, 
            isPublic: boolean,
            isRSVPRequired: boolean, 
            isRSVPLimited: boolean,
            allowGuestInvites: boolean,
            RSVPMax: number,
        }
*/
export default Event;
