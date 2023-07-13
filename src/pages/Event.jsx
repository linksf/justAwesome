import { useState, useContext, useEffect } from "react";
import { Routes, Route, Outlet, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FirebaseContext } from "../context/FirebaseContext";
import { BoardgameContext } from "../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

const Event = () => {
  const { id } = useParams();
  const { error, setError, colors, activateToast, SEARCHSCOPES } = useContext(
    UtilityContext
  );
  const { getEventById, user } = useContext(FirebaseContext);
  const [state, setState] = useState({});
  const getEvent = async () => {
    const event = await getEventById(id);
    setState(event);
  };

  useEffect(() => {
    getEvent();
  }, [id]);

  return (
    <>
      <h1>{state.name}</h1>
      <p>{state.location}</p>
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
