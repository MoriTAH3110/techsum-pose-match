import { styled } from "styled-components";
import { PatternContainer } from "../PatternContainer/PatternContainer.styles";

export const PatterContainerOverride = styled(PatternContainer)`
    display: block;
`;

export const RankingContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackgroundPosesContainer = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 300px;

    & > img:first-of-type {
        transform: scaleX(-1);
    }
`;

export const MiniTaiContainer = styled.img`
    height: 600px;
`;

export const RankingWrapper = styled.div`
    width: 60%;
    padding-top: 35px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
`;

export const ScoreRankingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 20px;
`;

export const ScoreRankingEntry = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
`;

export const ScoreRankingData = styled.div`
    width: 30%;
    font-family: ${({ theme }) => theme.fonts.ITCFranklinDmCp};
    color: ${({ theme }) => theme.colors.blue};
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 600;
    line-height: 129.5%;
`;

export const TeamNameWrapper = styled(ScoreRankingData)`
    text-align: right;
    transform: rotate(-1.3deg);
`;

export const Separator = styled(ScoreRankingData)`
    width: 320px;
    overflow: hidden;
`;

export const TeamScoreWrapper = styled(ScoreRankingData)`
    text-align: left;
    transform: rotate(-1.3deg);
`;