import styled, { css } from "styled-components";
import { defaultTheme } from "../../theme/DefaultTheme";
import { TimerStyle } from "../Timer/Timer.styles";

const mainGameBaseStyle = css`
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90vw;
  @media (orientation: landscape) {
    width: 40vw;
    padding-top: 200px;
  }
`;

const imageBaseStyle = css`
  & img {
    position: absolute;
    width: 80%;
    top: -120px;
    left: -300px;
    @media (orientation: landscape) {
      width: 80%;
      left: -350px;
      top: 0px;
    }
  }
`

const poseWrapperStyle = css`
  & .pose-wrapper {
    position: relative;
    top: -100px;
  }
`;

const canvasBaseStyle = css`
  & canvas {
    width: 100%;
    box-shadow: 10px 10px 0 ${defaultTheme.colors["purple"]};
    @media (orientation: landscape) {
      width: 85%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`

const buttonBaseStyle = css`
  & button {
    background-color: ${defaultTheme.colors["purple"]};
    color: ${defaultTheme.colors["yellow"]};
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    margin-bottom: 5px
  }
`

const scoreWrapperBaseStyle = css`
  & .score-wrapper {
    margin-top: -160px;
    margin-bottom: 150px;
  }
`

const timerStyleOverrides = css`
	${TimerStyle} {
		@media (orientation: landscape) {
      position: relative;
      left: 48%;
      bottom: 17%;
    }
	}
`;

export const MainGameStyle = styled.div`
  ${mainGameBaseStyle}
  ${poseWrapperStyle}
  ${imageBaseStyle}
  ${canvasBaseStyle}
  ${buttonBaseStyle}
  ${scoreWrapperBaseStyle}

  ${timerStyleOverrides}
`