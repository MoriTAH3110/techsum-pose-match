import styled from "styled-components";
import bullet from "../../assets/bullet.svg"

export const Ul = styled.ul`
  list-style-image: url(${bullet});
  display: flex;
  justify-content: center;
  flex-direction: column;
`


export const LiText = styled.div`
  position: relative;
  font-family: ${({theme})=> theme.fonts.ITCFranklinDmCp};
  font-size: 72px;
  text-transform: uppercase;
  color: ${({theme})=> theme.colors.blue};
  transform: rotate(-1.3deg);
  line-height: 129.5%;
  top: -40px;
  left: 20px;
`
export const Img = styled.img<{$left?: number, $right?: number}>`
  position: absolute;
  ${({$left})=> $left ? `left: ${$left}px;` : ""}
  ${({$right})=> $right ? `right: ${$right}px;` : ""}
`