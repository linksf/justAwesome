import { useContext, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { UtilityContext } from "../context/UtilityContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Icon = styled(FontAwesomeIcon)`
  position: relative;
  right: 35px;
  top: 5px;
  grid-column: 5/6;
  cursor: pointer;
  color: #0055a4;
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
  color: yellow;
  text-align: center;
  grid-column: 1/6;
  background-color: #0055a4;
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
  grid-column: 1/5;
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
//**********************************************************************//
const SignInUp = () => {
  const MODES = { SIGNIN: "signin", SIGNUP: "signup" };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [mode, setMode] = useState(MODES.SIGNUP);
  const { signUp, signIn, user } = useContext(FirebaseContext);
  // const { setError } = useContext(UtilityContext);
  const [passwordType, setPasswordType] = useState("password");
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === MODES.SIGNIN) {
      signIn(formData);
    } else {
      signUp(formData);
    }
  };
  const togglePasswordType = (e) => {
    const newPasswordType = passwordType === "password" ? "text" : "password";
    setPasswordType(newPasswordType);
  };
  return (
    <Wrapper>
      <Form>
        <Header>{mode === MODES.SIGNUP ? "Sign Up" : "Sign In"}</Header>
        <Label>Email</Label>
        <Input name="email" value={formData.email} onChange={handleChange} />
        <Label>Password </Label>
        <Input
          name="password"
          type={passwordType}
          value={formData.password}
          onChange={handleChange}
        />
        <Icon
          onClick={togglePasswordType}
          icon={passwordType === "password" ? faEye : faEyeSlash}
        />
        {mode == MODES.SIGNIN ? null : (
          <>
            <Label>Confirm</Label>
            <Input
              type={passwordType}
              name="password2"
              value={formData.password2}
              onChange={handleChange}
            />
            <Icon
              onClick={togglePasswordType}
              icon={passwordType === "password" ? faEye : faEyeSlash}
            />
          </>
        )}
        <Button type="submit" onClick={handleSubmit}>
          {mode == MODES.SIGNIN ? "Sign In" : "Sign Up"}
        </Button>
        {mode == MODES.SIGNUP ? (
          <Text onClick={() => setMode(MODES.SIGNIN)}>
            Already have an account? <Span>Sign In</Span> here
          </Text>
        ) : (
          <Text onClick={() => setMode(MODES.SIGNUP)}>
            Need an account? <Span>Sign Up</Span> here
          </Text>
        )}
      </Form>
    </Wrapper>
  );
};

export default SignInUp;
