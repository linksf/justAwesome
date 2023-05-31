import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../Utilities/colors";
import { Link } from "react-router-dom";
const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  background-color: white;
`;

const NavItem = styled(Link)`
  transition: all 0.4s ease;
  height: 40px;
  width: 100%;
  vertical-align: center;
  padding: 10px;
  line-height: 40px;
  text-align: center;
  font-weight: 600;

  font-family: "Roboto", sans-serif;
  color: ${(props) =>
    props.activetab ? colors.highlightYellow : colors.primary};
  cursor: pointer;
  background-color: ${(props) =>
    props.activetab ? colors.primary : colors.highlightYellow};
`;

const Nav = (props) => {
  const { activetab, setactivetab, tabs } = props;
  return (
    <NavWrapper>
      {tabs.map((tab, i) => (
        <NavItem
          key={i}
          to={tab.toLowerCase()}
          tabIndex={i}
          activetab={activetab === i ? 1 : 0}
          onClick={(e) => setactivetab(i)}
        >
          {tab}
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default Nav;
