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

const Event = (props) => {
  const { uid } = useParams();
  const { error, setError, colors, activateToast, SEARCHSCOPES } = useContext(
    UtilityContext
  );

  useEffect(() => {}, [uid]);

  return (
    <>
      <SubNav
        subtabs={subTabs}
        activesubtab={activeSubTab}
        setactivesubtab={setActiveSubTab}
      />
    </>
  );
};

export default Events;
