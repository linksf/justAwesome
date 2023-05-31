// import { useState, useEffect, useContext } from "react";
// import styled from "styled-components";
// import { UtilityContext } from "../context/UtilityContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

import React, { useContext, useEffect } from "react";
import { UtilityContext } from "../context/UtilityContext";
import styled, { keyframes } from "styled-components";
import colors from "../Utilities/colors";

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;
const ToastContainer = styled.div`
  position: fixed;
  top: ${(props) => (props.show ? 0 : "-100px")};
  opacity: ${(props) => (props.show ? 1 : "1")};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  transition: all 0.5s ease-in-out;
  z-index: 9999;
`;

const ToastWrapper = styled.div`
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 16px;
  border-radius: 4px;
  border: 2px solid ${(props) => (props.type ? props.type : "#232323")};
`;

const ToastHeadline = styled.h3`
  margin: 0 0 8px 0;
`;

const ToastMessage = styled.p`
  margin: 0;
`;

const Toast = () => {
  const { toastInfo, setError, hideToast } = useContext(UtilityContext);
  const { headline, message, showToast, type } = toastInfo;

  useEffect(() => {
    if (showToast) {
      const timeout = setTimeout(() => {
        hideToast();
        setError(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showToast, hideToast]);

  return showToast ? (
    <ToastContainer type={type} show={showToast}>
      <ToastWrapper>
        <ToastHeadline>{headline}</ToastHeadline>
        <ToastMessage>{message}</ToastMessage>
      </ToastWrapper>
    </ToastContainer>
  ) : null;
};

export default Toast;

// const Container = styled.div`
//   position: fixed;
//   top: ${(props) => (props.show ? "10px" : "-100px")};
//   opacity: ${(props) => (props.show ? "1" : "0")};
//   transition: all 0.5s ease-in-out;
//   right: 0;
//   width: 100px;
//   height: 40px;
//   margin: 0 auto;
//   padding: 5px;
//   background-color: ${(props) => (props.bgcolor ? props.bgcolor : "#ecf0f1")};
//   border: 2px solid
//     ${(props) => (props.bordercolor ? props.bordercolor : "transparent")};
// `;

// const Headline = styled.h3`
//   font-size: 14px;
//   font-weight: bold;
//   color: ${(props) => (props.color ? props.color : "#232323")};
//   text-align: center;
// `;

// const Message = styled.p`
//   font-size: 12px;
//   color: ${(props) => (props.color ? props.color : "#232323")};
//   text-align: center;
// `;

// const Icon = styled(FontAwesomeIcon)`
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   font-size: 12px;
//   color: ${(props) => (props.color ? props.color : "#2c3e50")};
//   cursor: pointer;
// `;

// //

// const Toast = (props) => {
//   const { headline, message, type, duration } = props.info;
//   const { error, colors } = useContext(UtilityContext);
//   const [show, setShow] = useState(false);
//   const [copy, setCopy] = useState("");

//   useEffect(() => {
//     let copyText = message ? message : error ? error.message : "";
//     setCopy(copyText);
//   }, [error, message]);

//   useEffect(() => {
//     setShow(true);
//     setTimeout(() => {
//       setShow(false);
//     }, duration);
//   }, [error]);

//   return (
//     <Container boardercolor={type} show={show}>
//       {headline && <Headline>{headline}</Headline>}
//       <Message>{message}</Message>
//       <Icon
//         icon={faXmark}
//         color={colors.highlightRed}
//         onClick={() => setShow(false)}
//       />
//     </Container>
//   );
// };

// export default Toast;
