import styled, { css } from "styled-components";
import { defaultTheme } from "../../theme/DefaultTheme";
import ScoreFrame from "../../assets/images/ScoreFrame.svg"


const summaryBaseStyle = css`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 350px;
`;

const scoreBaseStyle = css`
    & .score-wrapper {
      background-image: url(${ScoreFrame});
      background-repeat: no-repeat;
      width: 770px;
      height: 770px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: ${defaultTheme.colors.maroon};

      & p {
        margin: 0;
        padding: 0;
        font-size: 50px;
      }
      & h3 {
        margin: 0;
        padding: 0;
        font-size: 200px;
        line-height: 135px;
      }
    }
`;

export const SummaryStyle = styled.div`
    ${summaryBaseStyle}
    ${scoreBaseStyle}
`;

export const TaiBaseStyle = styled.img`
  height: 1500px;
  position: fixed;
  bottom: 0;
  right: 0;
`