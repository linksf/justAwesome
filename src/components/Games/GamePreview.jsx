import { useState } from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.25rem;
  grid-area: name;
  background-color: #232323;
  color: #ecf0f1;
`;
const Thumbnail = styled.img`
  width: 100px;
  grid-area: img;
  padding: 0 10px;
`;
const DescriptionContainer = styled.div`
  grid-area: desc;
  overflow: hidden;
  padding: 0 10px;
  position: relative;
  transition: all 0.5s ease;
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.displaymode === "more"
        ? "red"
        : "linear-gradient(180deg, rgba(255, 255, 255, 0) 80%, rgba(255, 255, 255, 1) 100%"};
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s ease;
  }
`;
const Description = styled.p`
  max-height: ${(props) => (props.displayMode === "more" ? "100%" : "4rem")};
  overflow: hidden;
`;
const Info = styled.div`
  grid-area: info;
`;
const MoreLessToggle = styled.h3`
  color: #ff0093;
`;
const GamePreviewWrapper = styled.div`
  padding: 0;
  position: relative;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  display: grid;
  grid-template-areas:
    "name name name"
    "img desc desc"
    "img info info";
`;

const GamePreview = (props) => {
  const { gameobject } = props;
  const { name, description_preview, thumb_url, id } = gameobject;
  const [displayMode, setDisplayMode] = useState("less");
  const toggleMoreLess = (e) => {
    setDisplayMode((prevState) => (prevState === "more" ? "less" : "more"));
  };

  return (
    <GamePreviewWrapper>
      <Title>{name}</Title>
      <Thumbnail src={thumb_url} />
      <DescriptionContainer displaymode={displayMode}>
        <Description displaymode={displayMode}>
          {description_preview}
        </Description>
        <MoreLessToggle onClick={toggleMoreLess}>
          {displayMode === "more" ? "less" : "more"}
        </MoreLessToggle>
      </DescriptionContainer>
      <Info></Info>
    </GamePreviewWrapper>
  );
};
export default GamePreview;
