import styled, { css } from "styled-components";
import { defaultTheme } from "../../theme/DefaultTheme";

interface ITimerStyle {
	progress: number;
}

const timerBaseStyle = css<ITimerStyle>`
    display: flex;
    justify-content: center;
`

const chartBaseStyle = css<ITimerStyle>`
    .chart {
        background: ${({ progress }) => `conic-gradient(${defaultTheme.colors["white"]} ${progress}%, ${defaultTheme.colors["purple"]} 0);`}
        width: 50px;
        height: 50px;
        border-width: 3px;
        border-color: ${defaultTheme.colors["black"]};
        border-style: solid;
        border-radius: 50%;
        box-shadow: 5px 5px 0px black;
    }
`

const cardsBaseStyle = css`
    .cards {
        display: flex;
        gap: 3px;
        margin-left: 20px;
        align-items: center;
        & div {
            width: 33px;
            height: 33px;
            background-color: ${defaultTheme.colors["white"]};
            border-width: 1px;
            border-color: ${defaultTheme.colors["black"]};
            border-style: solid;
            box-shadow: 5px 5px 0px black;
            color: ${defaultTheme.colors["black"]};
            line-height: 33px;
            display: flex;
            justify-content: center;
        }
    }
`

export const TimerStyle = styled.div<ITimerStyle>`
    ${timerBaseStyle}
    ${chartBaseStyle}
    ${cardsBaseStyle}
`;