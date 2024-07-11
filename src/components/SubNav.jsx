import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import colors from "../Utilities/colors";
import { Link } from "react-router-dom";
import ToolTip from "../elements/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${colors.highlightYellow};
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
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  left: 0;
  width: max-content;
  height: 60px;
  z-index: 999;
  backdrop-filter: blur(5px);
  padding: 30px auto;
  background-color: transparent;

  //media queries for all common screen sizes (mobile, tablet, desktop). change the max-width to adjust the screen size
  /* @media (min-width: 768px) {
    max-height: 50px;
    width: 600px;
  }

  @media (min-width: 1024px) {
    height: 50px;
    width: 800px;
  } */
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
