import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = styled(FontAwesomeIcon)`
  position: relative;
  right: ${props => props.right ? props.right : "0"};
  top: ${props => props.top ? props.top : "0"};;
  grid-column: ${props => props.column ? props.column : null};
  cursor: pointer;
  color: ${props => props.color ? props.color : "#0055a4"};
`;
const Wrapper = styled.div`
  border: 3px solid white;
  border-radius: 10px;
  width: 80%;
  max-width: 400px;
  height: auto;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 5px;
  background: #ecf0f199;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
`;

const Header = styled.h1`
  font-size: 20px;
   color: ${props => props.color ? props.color : "yellow"};
  text-align: center;
  grid-column: 1/6;
  background-color: ${props => props.bgcolor ? props.bgcolor : "#0055a4"};
  padding: 10px;
  border-radius: 10px 10px 0 0;
  margin: 0;
`;
const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid #0055a4;
  background: transparent;
  color: #0055a4;
  font-size: 18px;
  position: relative;
  grid-column: 2/5;
`;
// &::after {
//   content: ${(props) => props.type == "password"(<Icon icon={faEye} />)};
//   position: absolute;
//   right: 0;
// }

const Label = styled.label`
  text-align: right;
  padding: 10px 10px 0 0;
  color: #0055a4;
  font-weight: bold;
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  grid-column: 1/2;
  padding-left: 10px;
`;

const Button = styled.button`
  grid-column: 2/4;
  width: 150px;
  justify-self: flex-end;
  background-color: yellow;
  font-size: 18px;
  color: #0055a4;
  border-color: #0055a4;
`;
const Text = styled.p`
  grid-column: 1/5 ;
  justify-self: flex-end;
  background-color: f56530;
  font-size: 14x;
  font-weight: bold;
  color: #0055a4;
  cursor: pointer;
`;
const Span = styled.span`
  color: #f56530;
`;

export {Wrapper, Form, Header, Input, Label, Button, Text, Span, Icon}