import styled from "styled-components";
import borderImg from "../../assets/patterns/borderImg.svg"

const DEFAULT_HORIZONTAL_PADDING = 152

export const ButtonStyle = styled.button`
  position: absolute;
  bottom: 0px;
  right: 0px;
  transform: translate(-50%, 0%);
  border-image-source: url(${borderImg});
  border-image-slice: 5;
  border-width: 12px;
  padding-left: ${DEFAULT_HORIZONTAL_PADDING}px;
  padding-right: ${DEFAULT_HORIZONTAL_PADDING}px;
  padding-top: 0px;
  transition: all 500ms;
  font-family: ${({theme})=> theme.fonts.ITCFranklinDmCp};
  font-size: 97px;
  color: ${({theme})=> theme.colors.white};
  background-color: ${({theme})=> theme.colors.white};

  &:hover{
    border-width: 5px;
    padding-left: ${DEFAULT_HORIZONTAL_PADDING+7}px;
    padding-right: ${DEFAULT_HORIZONTAL_PADDING}px;
    padding-top: 7px;

    &::after{
      padding-top: 7px;
      padding-left: 7px;
      padding-left: ${DEFAULT_HORIZONTAL_PADDING+7}px;
      padding-right: ${DEFAULT_HORIZONTAL_PADDING}px;
    }
  }

  &::after{
    transition: all 500ms;
    white-space: nowrap;
    padding-top: 0;
    padding-left: ${DEFAULT_HORIZONTAL_PADDING}px;
    padding-right: ${DEFAULT_HORIZONTAL_PADDING}px;
    content: attr(data-text-content);
    color: ${({theme})=> theme.colors.blue};
    position: absolute;
    width: fit-content;
    top: 0px;
    left:0px;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  height: 141px;
  position: relative;
`
