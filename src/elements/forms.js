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
const FormWrapper = styled.div`
box-sizing: border-box;
  border: 3px solid white;
  border-radius: 5px;
 padding: ${props=> props.padding || "0px"};
  max-width: 800px;
  height: auto;
  margin: 0 auto;
`;
const Form = styled.form`
  width: 100%;
  padding: ${props=> props.padding || "0px"};
  display: grid;
  grid-template-columns: ${(props) => props.templatecolumns || "2fr 3fr 1fr"};
  grid-gap: 5px;
  background: #ecf0f199;
  border-radius: 10px;
  font-family: "Roboto", sans-serif;
  border: ${props=> props.border || "none"};
  box-sizing: border-box;
`;

const Header = styled.h1`
  font-size: 20px;
   color: ${props => props.color ? props.color : "yellow"};
  text-align: center;
  grid-column: ${props => props.column || "1/6"};
  background-color: ${props => props.bgcolor ? props.bgcolor : "#0055a4"};
  padding: 10px;
  border-radius: 10px 10px 0 0;
  margin: 0;
`;
const Collection = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-column: ${props => props.column || "1/6"};
  justify-content: center;
  align-items: center;
  padding: 10px;

`
const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 2px solid #0055a4;
  background: transparent;
  color: #0055a4;
  font-size: 15px;
  position: relative;
  grid-column:  ${props => props.column || "2/5"};
  padding: 0px;
  margin-right: 10px;
  height: 28px;
 
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
// &::after {
//   content: ${(props) => props.type == "password"(<Icon icon={faEye} />)};
//   position: absolute;
//   right: 0;
// }

const Label = styled.label`
  text-align: left;
  padding: 10px 10px 0 0;
  color: #0055a4;
  font-weight: bold;
  font-size: 15px;
  height: 28px;
  grid-column:  ${props => props.column || "1/2"};
  padding-left: 10px;
`;

const Button = styled.button`
  grid-column:  ${props => props.column || "2/4"};
  width: 100px;
  justify-self: flex-end;
  background-color: yellow;
  font-size: 15px;
  color: #0055a4;
  border-color: #0055a4;
  margin: 10px;
`;

const Text = styled.p`
  grid-column:  ${props => props.column || "1/5"} ;
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
const TextArea = styled.textarea`
width: ${({width})=>width || null};
height: ${({height})=>height || null};
max-width: 100
`
const Checkbox = styled.input`
  grid-column:  ${props => props.column || "1/2"};
  justify-self: flex-start;
  background-color: #f56530;
  font-size: 14x;
  font-weight: bold;
  color: #0055a4;
  cursor: pointer;

`
const Select = styled.select`
  outline: none;
  border: none;
  border-bottom: 2px solid #0055a4;
  background: transparent;
  color: #0055a4;
  font-size: 15px;
  position: relative;
  grid-column:  ${props => props.column || "2/5"};
  padding: 0px;
  margin-right: 10px;
  height: 28px;
  width: 100%;
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Fieldset = styled.fieldset`
  grid-column:  ${props => props.column || "2/5"};
`;
const Legend = styled.legend``;
const Option = styled.option``;
export {FormWrapper, Form, Header, Input, Label, Button, Text, Span, Icon, Checkbox, Select, Option, Collection, Fieldset, Legend, TextArea}