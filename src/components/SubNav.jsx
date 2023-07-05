import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../Utilities/colors";
import { Link } from "react-router-dom";
import ToolTip from "../elements/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: white;
  border-radius: 50%;
  height: 40px;
  margin: 15px;
  text-align: center;
  line-height: 1rem;
  transition: all 0.1s ease;
  //border: 1px solid #232323;
  &:hover {
    transform: scale(1.1);
  }
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: sticky;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 999;
  backdrop-filter: blur(5px);
  padding: 30px auto;
  background-color: #ffff0022;

  //media queries for all common screen sizes (mobile, tablet, desktop). change the max-width to adjust the screen size
  @media (max-width: 768px) {
    height: 70px;
    width: 100%;
    padding: 0px auto;
  }

  @media (max-width: 1024px) {
    height: 70px;
    width: 100%;
    padding: 0px auto;
  }
`;

const NavItem = styled.div`
  transition: all 0.2s ease;
  height: 40px;
  width: 100%;
  vertical-align: center;
  padding: 10px;
  line-height: 40px;
  cursor: pointer;
`;

const SubNav = (props) => {
  const { subTabData } = props;
  return (
    <NavWrapper>
      {subTabData.map((tab, i) => (
        <ToolTip key={i} text={tab.text}>
          <Icon icon={tab.icon} onClick={tab.action} />
        </ToolTip>
      ))}
    </NavWrapper>
  );
};

export default SubNav;
