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
      align-items: center;
      color: ${defaultTheme.colors.maroon};
      padding-left: 35px;
      padding-top: 240px;
      transform: rotate(8.59deg);

      & p {
        margin: 0;
        padding: 0;
        font-size: 50px;
        font-weight: 800
      }
      & h3 {
        margin: 0;
        padding: 0;
        font-size: 135px;
        line-height: 135px;
        font-weight: 900;
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