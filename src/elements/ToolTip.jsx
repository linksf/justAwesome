import { useState, useContext } from "react";
import styled from "styled-components";

//ToolTip component
const ToolTipWrapper = styled.div`
  position: relative;
  display: inline-block;
  //border-bottom: 1px dotted black;
`;

const ToolTipText = styled.p`
  //visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: ${(props) => (props.show ? "125%" : "-100px")};
  left: 50%;
  margin-left: -60px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.5s ease;
`;

const ToolTipIcon = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  //border-bottom: 1px dotted black;
`;

const ToolTip = ({ children, text }) => {
  const [hover, setHover] = useState(0);
  const handleMouseEnter = () => {
    setHover(1);
  };
  const handleMouseLeave = () => {
    setHover(0);
  };
  return (
    <ToolTipWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ToolTipIcon>{children}</ToolTipIcon>
      <ToolTipText show={hover}>{text}</ToolTipText>
    </ToolTipWrapper>
  );
};

export default ToolTip;
