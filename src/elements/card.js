import {styled} from 'styled-components'
import colors from '../Utilities/colors.js'
const CardWrapper = styled.div`
    width: ${props => props.orientation === "landscape" ? "323px" : "200px" };
    height: ${props => props.orientation === "landscape" ? "200px" : "323px" };
    background-color: ${({bgcolor}) => bgcolor || colors.white};
    display: flex;
    flex-direction: ${props => props.orientation === "landscape" ? "row" : "column"};
    border-radius: 20px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`
const Header = styled.h1`
    width: 100%;
    min-height: 30px;
    font-size: 20px;
    background-color: ${({bgcolor}) => bgcolor || colors.primary};
    color: ${({color}) => color || colors.white};
    margin: 0;
    padding: 10px;
    border-radius: 20px 20px 0 0;
    text-align: ${props => props.orientation === 'landscape' ? 'left' : "center"};
`
const Body = styled.div`
    width: 100%;
`
export {CardWrapper, Header}
