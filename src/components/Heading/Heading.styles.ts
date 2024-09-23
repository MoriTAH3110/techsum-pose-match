import styled, {css, keyframes} from "styled-components"
import pattern1 from "../../assets/patterns/pattern1.svg"

interface HeadingProps {
  color?: "pink" | "yellow" | "purple" | "fuchsia";
  fontSize?: number;
  $wrapText: boolean
}

const openAnimation = (position: number) => keyframes`
0% {
  top: ${66 - 8*(position)}px;
  left:calc(50% + ${66 -8*(position)}px);
}
45% {
  top: ${66 - 8*(position)}px;
  left:calc(50% + ${66 - 8*(position)}px);
}
55% {
  top: ${66 - 10*(position)}px;
  left:calc(50% + ${66 - 10*(position)}px);
}
100% {
  top: ${66 - 10*(position)}px;
  left:calc(50% + ${66 - 10*(position)}px);
}
`
export const HeadingContainer = styled.div`
position: relative;
text-align: center;
& :nth-child(8){
  animation-name: ${openAnimation(6)};
}
& :nth-child(7){
  animation-name: ${openAnimation(6)};
}
& :nth-child(6){
  animation-name: ${openAnimation(5)};
}
& :nth-child(5){
  animation-name: ${openAnimation(4)}
}
& :nth-child(4){
  animation-name: ${openAnimation(3)}
}
& :nth-child(3){
  animation-name: ${openAnimation(2)}
}
& :nth-child(2){
  top: 58px;
  left: calc(50% + 58px);
  position: absolute;
}
& :nth-child(1){
  opacity: 0;
  position: relative;
}

`

const BasicTextStyles = css<HeadingProps>`
margin: 0;
font-family: ${({theme})=> theme.fonts.adihausDinBoldItalic};
font-size: ${({ fontSize }) => `${fontSize}px`};
text-transform: uppercase;
`

export const HeadingPatternStyle = styled.h1<HeadingProps>`
${BasicTextStyles}
color: transparent;
-webkit-text-stroke-width: 3px;
-webkit-text-stroke-color: ${({theme})=> theme.colors.fuchsiaBorder};
background-image: url(${pattern1});
background-repeat: repeat;
-webkit-background-clip: text;
background-size: 30px;
position: absolute;
transform: translate(-50%, 0%);
animation-duration: 2s;
animation-direction: alternate;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;
${({$wrapText})=> $wrapText ? "" : "white-space: nowrap;"}
`
export const HeadingStyle = styled.h1<HeadingProps>`
${BasicTextStyles}
color: ${({theme, color})=> color ? theme.colors[color] : theme.colors.fuchsia};
position: absolute;
transform: translate(-50%, 0%);
animation-duration: 2s;
animation-direction: alternate;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;
${({$wrapText})=> $wrapText ? "" : "white-space: nowrap;"}
`

export const HeadingShadowsStyle = styled.h1<HeadingProps>`
${BasicTextStyles}
color: ${({theme})=> theme.colors.beige};
position: absolute;
top: 0;
left: 50%;
transform: translate(-50%, 0%);
-webkit-text-stroke-width: 3px;
-webkit-text-stroke-color: ${({theme})=> theme.colors.fuchsiaBorder};
animation-duration: 2s;
animation-direction: alternate;
animation-iteration-count: infinite;
animation-timing-function: ease-in-out;
${({$wrapText})=> $wrapText ? "" : "white-space: nowrap;"}
`