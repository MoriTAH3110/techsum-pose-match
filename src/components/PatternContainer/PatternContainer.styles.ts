import styled, {keyframes} from "styled-components";
import pattern1 from "../../assets/patterns/pattern1.svg"

const backgroundMovement = keyframes`
  from{
    background-position: 0% 0%;
  }
  to{
    background-position: 100% 55%;
  }
`

export const PatternContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 133px;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after{
    content: " ";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-image: url(${pattern1});
    background-repeat: repeat;
    background-size: 80px;
    animation-duration: 12s;
    animation-name: ${backgroundMovement};
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    opacity: 0.4;
    z-index: -2;
  }
  &::before{
    content: " ";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(270deg, rgba(238, 123, 168, 0.33) 0%, rgba(238, 123, 168, 0.85) 100%);
    opacity: 1;
    z-index: -1;
  }
`

