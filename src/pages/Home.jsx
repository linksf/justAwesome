import { useContext, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import styled from "styled-components";

//**********************************************************************//
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #f5f5f5;
`;
const Button = styled.button``;
const Home = () => {
  const { user, logOut } = useContext(FirebaseContext);

  return (
    <Wrapper>
      <Button onClick={logOut}>SignOut</Button>
    </Wrapper>
  );
};

export default Home;
