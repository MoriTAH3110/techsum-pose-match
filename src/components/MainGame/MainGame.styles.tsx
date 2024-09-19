import styled, { css } from "styled-components";
import { defaultTheme } from "../../theme/DefaultTheme";

const mainGameBaseStyle = css`
    background-color: ${defaultTheme.colors["pink"]};
    color: ${defaultTheme.colors["purple"]};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 50px;
`;

const headerBaseStyle = css`
    & h1 {
        font-size: 6em;
        align-self: center;
        text-transform: uppercase;
    }
`

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

const scoreBaseStyle = css`
    & h2 {
        align-self: center;
        font-size: 4em;
    }
`

export const MainGameStyle = styled.div`
    ${mainGameBaseStyle}
    ${headerBaseStyle}
    ${imageBaseStyle}
    ${canvasBaseStyle}
    ${buttonBaseStyle}
    ${scoreBaseStyle}
`;