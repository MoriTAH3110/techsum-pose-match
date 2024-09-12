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

const imageBaseStyle = css`
    & img {
        position: absolute;
        width: 40%;
        top: 20px;
        left: 1vw;
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

export const MainGameStyle = styled.div`
    ${mainGameBaseStyle}
    ${imageBaseStyle}
    ${buttonBaseStyle}
`;