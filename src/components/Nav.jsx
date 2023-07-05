import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../Utilities/colors";
import { Link, NavLink } from "react-router-dom";
import { UtilityContext } from "../context/UtilityContext";
const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: white;
  z-index: 999;
`;

const NavItem = styled(NavLink)`
  transition: all 0.1s ease;
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
  const { activeTab, setActiveTab, tabs } = useContext(UtilityContext);
  return (
    <NavWrapper>
      {tabs.map((tab, i) => (
        <NavItem
          key={i}
          to={tab.toLowerCase()}
          tabIndex={i}
          activetab={activeTab === i ? 1 : 0}
          onClick={(e) => setActiveTab(i)}
        >
          {tab}
        </NavItem>
      ))}
    </NavWrapper>
  );
};

export default Nav;
