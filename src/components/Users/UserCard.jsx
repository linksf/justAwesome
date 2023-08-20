import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { UtilityContext } from "../../context/UtilityContext";
import { styled } from "styled-components";
import { CardWrapper, Header } from "../../elements/card.js";

const UserCard = ({ userObject }) => {
  const { name } = userObject;
  return (
    <CardWrapper>
      <Header>{name}</Header>
    </CardWrapper>
  );
};

export default UserCard;
