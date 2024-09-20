import styled, {keyframes} from "styled-components";

const MarqueeAnimation = keyframes`
from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
`

export const MarqueeStyle = styled.div`
  color: ${({theme})=> theme.colors.white};
  background-color: ${({theme})=> theme.colors.lavender};
  border: 3px ${({theme})=> theme.colors.fuchsiaBorder} solid;
  font-family: ${({theme})=> theme.fonts.adihausDinBold};
  font-size: 40px;
  display: flex;
  width: fit-content;
  overflow: hidden;
  position: absolute;
  transform: rotate(-27deg);
  top: 0px;
`

export const MarqueeTextStyle = styled.div<{$duration:number}>`
  animation: ${MarqueeAnimation} linear infinite;
  animation-duration: ${({$duration})=> $duration}s;
  white-space: nowrap;
  text-transform: uppercase;
`
