import styled from "styled-components";

const PageWrapperGrid = styled.div`
  width: 100%;
  height: 100%;
  
  padding: 10px;
  margin: 0 auto;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
`;
const PageWrapperFlex = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff55;
  padding: 10px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : "column"};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 0 10px #000000ff;
`;

const Section = styled.div`
  width: 100%;
  height: max-content;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  padding: 5px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  grid-column: ${(props) => (props.columns ? props.columns : null)};
`;

const Row = styled.div`
  width: 100%;
  height: max-content;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.color};
  padding: 5px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: ${props=> props.justify ? props.justify : "space-between"};
  align-items: center;
  grid-column: ${(props) => (props.columns ? props.columns : null)};
`

const TabbedWrapper = styled.div`
width: 100%
`
const TabSelectorHolder = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: stretch;
`
const TabSelector = styled.div`
height: 30px;
color: ${props=>props.color};
background-color: ${props=>props.bgcolor};
`
const TabBody = styled.div``
export {TabBody, TabSelector, TabSelectorHolder, TabbedWrapper, PageWrapperGrid, PageWrapperFlex, Section, Row}
