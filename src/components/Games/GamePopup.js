import { useState, useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "../../context/FirebaseContext";
import { UtilityContext } from "../../context/UtilityContext";
import { BoardgameContext } from "../../context/BoardgameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCirclePlus,
  faCircleInfo,
  faCircleQuestion,
  faCircle,
  faEyeCircle,
  faClose
} from "@fortawesome/free-solid-svg-icons";

