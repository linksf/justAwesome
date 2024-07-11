import { useState, useContext } from "react";
import styled from "styled-components";

//ToolTip component
const ToolTipWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 0;
  margin: 0;
  //border-bottom: 1px dotted black;
`;

const ToolTipText = styled.p`
  //visibility: hidden;
  width: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  /* bottom: ${(props) => (props.show ? "125%" : "-100px")}; */
  left: 50%;
  margin-left: -60px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: all 0.2s ease;
`;

const ToolTipIcon = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  transform: ${(props)=> (props.show ? "scale(120%)" : "scale(100%)" )};
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
      <ToolTipIcon show={hover}>{children}</ToolTipIcon>
      <ToolTipText show={hover}>{text}</ToolTipText>
    </ToolTipWrapper>
  );
};

export default ToolTip;
