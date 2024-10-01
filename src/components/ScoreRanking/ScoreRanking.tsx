import { useEffect, useState } from "react";
import { Heading } from "../Heading/Heading";
import {
    BackgroundPosesContainer,
    MiniTaiContainer,
    PatterContainerOverride,
    RankingContainer,
    RankingWrapper,
    ScoreRankingEntry,
    ScoreRankingWrapper,
    Separator,
    TeamNameWrapper,
    TeamScoreWrapper
} from "./ScoreRanking.styled";
import { poseImageDictionary } from "../MainGame/PoseDictionary";

const SCORE_DB = 'https://kind-hermit-freely.ngrok-free.app';

type RankingEntry = {
    teamName: string;
    score: number;
};

type GetTeamsResponse = {
    teamName: string;
    totalScore: number;
    teamMembers: {
        id: string;
        name: string;
        score: number;
    }[];
};

const ScoreRanking = () => {
    const [ranking, setRanking] = useState<RankingEntry[]>([]);

    useEffect(() => {
        //Fetch for score
        fetch(`${SCORE_DB}/get-teams`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Access-Control-Allow-Origin": 'https://kind-hermit-freely.ngrok-free.app',
            },
            mode: "cors",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                return response.json();
            }).then((data: GetTeamsResponse[]) => {
                const ranking = data.map((team) => {
                    return {
                        teamName: team.teamName,
                        score: team.totalScore,
                    };
                });

                setRanking(ranking);
            });
    }, []);

    return (
        <PatterContainerOverride>
            <RankingContainer>
                <BackgroundPosesContainer>
                    <MiniTaiContainer src={poseImageDictionary["inTheSkyMessi"]} />
                    <MiniTaiContainer src={poseImageDictionary["inTheSkyMessi"]} />
                </BackgroundPosesContainer>
                <RankingWrapper>
                    <Heading fontSize={160} color="yellow" layerFillColor="lavender">Ranking</Heading>
                    <ScoreRankingWrapper>
                        {
                            ranking.slice(0, 7).map((entry) => {
                                return (
                                    <ScoreRankingEntry>
                                        <TeamNameWrapper>{entry.teamName}</TeamNameWrapper>
                                        <Separator>.........................</Separator>
                                        <TeamScoreWrapper>{`${entry.score}pts`}</TeamScoreWrapper>
                                    </ScoreRankingEntry>
                                )
                            })
                        }
                    </ScoreRankingWrapper>
                </RankingWrapper>
            </RankingContainer>
        </PatterContainerOverride>
    );
};

export default ScoreRanking;