import { useState, useContext, useEffect } from "react";
import { styled } from "styled-components";
import colors from "../../Utilities/colors";
import { FirebaseContext } from "../../context/FirebaseContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(5px);
  display: grid;
  place-content: center;
`;
const Container = styled.div`
  width: 300px;
  height: 250px;
  background-color: ${colors.white};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Instructions = styled.p`
  width: 100%;
  text-align: center;
  padding: 5px;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 5px;
`;
const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: ${colors.highlightRed};
  width: 15px;
`;
const Submit = styled.button`
  padding: 5px;
  margin: 10px;
  align-self: flex-end;
`;

const Invite = ({ event, close }) => {
  const { groupEventInvite } = useContext(FirebaseContext);
  const [emails, setEmails] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setEmails(e.target.value);
  };

  const sendInvites = async () => {
    await groupEventInvite(emails, event.UUID);
    close();
  };

  return (
    <Wrapper>
      <Container>
        <Icon onClick={close} icon={faTimes} />
        <Instructions>Comma separated list of emails</Instructions>
        <TextArea value={emails} onChange={handleChange} />
        <Submit onClick={sendInvites}>Send Invitations</Submit>
      </Container>
    </Wrapper>
  );
};
export default Invite;
