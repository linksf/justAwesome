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
  height: 30px;
  margin: 25px;
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
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  backdrop-filter: blur(5px);
  padding: 30px auto;
  background-color: #ffff0022;

  //media queries for all common screen sizes (mobile, tablet, desktop). change the max-width to adjust the screen size
  @media (max-width: 768px) {
    max-height: 50px;
    width: 100%;
    padding: 0px auto;
  }

  @media (max-width: 1024px) {
    height: 50px;
    width: 100%;
    padding: 0px auto;
  }
`;

const NavItem = styled.div`
  transition: all 0.2s ease;
  height: 40px;
  width: 100%;
  vertical-align: center;
  padding: 5px;
  line-height: 40px;
  cursor: pointer;
`;

const SubNav = (props) => {
  const { subTabData } = props;
  return (
    <NavWrapper>
      {subTabData.map((tab, i) => (
        <ToolTip key={i} text={tab.text}>
          <Link to={tab.path}>
            <Icon icon={tab.icon} />
          </Link>
        </ToolTip>
      ))}
    </NavWrapper>
  );
};

export default SubNav;
