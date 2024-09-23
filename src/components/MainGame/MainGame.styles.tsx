import styled, { css } from "styled-components";
import { defaultTheme } from "../../theme/DefaultTheme";

const mainGameBaseStyle = css`
    color: ${defaultTheme.colors["purple"]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60vw;
`;

const imageBaseStyle = css`
    & img {
        position: absolute;
        width: 40%;
        top: 20px;
        left: 1vw;
    }
`

const canvasBaseStyle = css`
& canvas {
    box-shadow: 10px 10px 0 ${defaultTheme.colors["purple"]};
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
        margin-top: -220px;
        margin-bottom: 150px;
    }
`

const scoreBaseStyle = css`
    & h2 {
        align-self: center;
        font-size: 4em;
    }
`

export const MainGameStyle = styled.div`
    ${mainGameBaseStyle}
    ${imageBaseStyle}
    ${canvasBaseStyle}
    ${buttonBaseStyle}
    ${scoreBaseStyle}
    ${scoreWrapperBaseStyle}
`;