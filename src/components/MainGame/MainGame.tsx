import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

import { useEffect, useRef, useState } from "react";
import { PlayerPose, Pose } from "../../types/TensorFlow.types";
import { MillisecondsEncoder } from "../../utils/format.utils";
import { MainGameStyle } from "./MainGame.styles";
import { PoseName } from "../../types/BodyPose.types";
import { poseImageDictionary, poseNameDictionary } from "./PoseDictionary";
import Timer from "../Timer/Timer";


const WEBCAM_SPECS = {
    width: 640,
    height: 480,
    flip: true
};

const MainGame = () => {
    //URL for the trained model
    const URL = "https://teachablemachine.withgoogle.com/models/ybrnIyoF9/"

    //GAMEPLAY
    let frameSkipCounter = 0;
    const GAME_TIME = 1 * 60 * 1000; //3 minutes
    const POSE_CHANGE_TIME = 15 * 1000; //15 seconds

    //REFS - To use value inside async functions
    const webcamRef = useRef<tmPose.Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const modelRef = useRef<tmPose.CustomPoseNet | null>(null);
    const posesBankRef = useRef<PoseName[]>([]);
    const incomingPosesRef = useRef<PoseName[]>([]);
    const poseToMatchRef = useRef<PoseName>('');
    const playerPoseRef = useRef<PlayerPose>({
        className: 'null',
        probability: 0
    });
    const playerPredictionsRef = useRef<PlayerPose[]>([]);

    const initialTime = useRef<number>(0);
    const remainingTimeRef = useRef<number>(0);
    const isGameStarted = useRef<boolean>(false);
    const poseChangeIntervalRef = useRef<NodeJS.Timeout>();

    const scoreRef = useRef<number>(0);

    //STATE - To render or modify UI
    const [playerPose, setPlayerPose] = useState<PlayerPose>({
        className: 'null',
        probability: 0
    });
    const [poseToMatch, setPoseToMatch] = useState<PoseName | null>(null);
    const [remainingTime, setRemainingTime] = useState<string>(MillisecondsEncoder.toMinutesSeconds(GAME_TIME));

    const [score, setScore] = useState<number>(0);

    //Game setup 
    useEffect(() => {
        const init = async () => {
            await tf.setBackend('webgl');  // Set WebGL backend
            await tf.ready();  // Ensure TensorFlow is ready

            //Set up model
            const modelURL = URL + "model.json";
            const metaDataURL = URL + "metadata.json";

            const loadedModel = await tmPose.load(modelURL, metaDataURL);
            modelRef.current = loadedModel;

            //Set up poses array
            posesBankRef.current = (loadedModel.getClassLabels() as PoseName[]).filter((label) => (label) !== 'Idle');
            incomingPosesRef.current = setInitialIncomingPoses(posesBankRef.current) as PoseName[];

            setPoseToMatch(incomingPosesRef.current[0]);
            poseToMatchRef.current = incomingPosesRef.current[0];

            //Set up camera
            const webcam = new tmPose.Webcam(WEBCAM_SPECS.width, WEBCAM_SPECS.height, WEBCAM_SPECS.flip);
            await webcam.setup();
            await webcam.play();
            webcamRef.current = webcam;

            requestAnimationFrame(update);

            const canvas = document.getElementById("canvas") as HTMLCanvasElement;

            if (canvas) {
                canvas.width = WEBCAM_SPECS.width;
                canvas.height = WEBCAM_SPECS.height;
                ctxRef.current = canvas.getContext('2d');
            }
        };

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Game loop
    const update = async (timestamp: DOMHighResTimeStamp) => {
        //#region GAME LOGIC
        frameSkipCounter++;

        webcamRef.current?.update();

        if (frameSkipCounter % 3 === 0) {
            await predict();
        }

        if (isGameStarted.current) {
            const timeDiff = (timestamp - initialTime.current);
            const timeLeft = GAME_TIME - timeDiff;
            remainingTimeRef.current = timeLeft;
            setRemainingTime(MillisecondsEncoder.toMinutesSeconds(timeLeft));

            //When player pose matches current pose to match
            if (playerPoseRef.current.className === poseToMatchRef.current) {
                scoreRef.current += 1000;
                setScore((prev) => prev + 1000); // TODO: factor in the remaining time
                onPoseChange(false);
            }

            if (timeLeft <= 10) {
                handleGameEnd();
            }
        }

        //#endregion
        requestAnimationFrame(update);
    };

    //Aux functions
    const predict = async () => {
        if (modelRef.current && webcamRef.current) {
            const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas);
            playerPredictionsRef.current = await modelRef.current.predict(posenetOutput);

            if (playerPredictionsRef.current.length > 0) {
                const highestPrediction = playerPredictionsRef.current.filter((p) => p.probability > 0.80)[0];

                const predictedPose = highestPrediction ? highestPrediction as PlayerPose : { className: 'null', probability: 0 } as PlayerPose;
                setPlayerPose(predictedPose);
                playerPoseRef.current = predictedPose;
            }

            drawPose(pose);
        }
    };

    const drawPose = (pose: Pose) => {
        const ctx = ctxRef.current;

        if (ctx && webcamRef.current?.canvas) {
            ctx.drawImage(webcamRef.current.canvas, 0, 0);

            if (pose) {
                const minPartConfidence = 0.75;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    };

    const setInitialIncomingPoses = (bank: string[]) => {
        const randomIndex = [];

        for (let i = 0; i < 3; i++) {
            const random = Math.floor(Math.random() * bank.length);
            randomIndex.push(random);
        }

        return randomIndex.map((index) => bank[index]);
    };

    const onPoseChange = (awardPoints: boolean) => {
        //Handle score
        if (awardPoints) {
            const poseProbability = playerPredictionsRef.current.filter(
                (pose) => pose.className === poseToMatchRef.current)[0].probability;

            console.log('🚀 ~ onPoseChange ~ poseProbability:', poseProbability);

            const scoreToAdd = Math.floor(poseProbability * 1000);

            scoreRef.current += scoreToAdd;

            setScore((prev) => prev + scoreToAdd);
        }

        //Update pose to match
        onUpdatePose();

        //Interval handler
        if (poseChangeIntervalRef.current !== null) {
            clearInterval(poseChangeIntervalRef.current);
        }

        poseChangeIntervalRef.current = setInterval(() => onPoseChange(true), POSE_CHANGE_TIME);
    };

    const onUpdatePose = () => {
        // Update pose to match and incoming poses
        const newPoseIndex = Math.floor(Math.random() * posesBankRef.current.length);
        const newPose = posesBankRef.current[newPoseIndex];

        incomingPosesRef.current.push(newPose);
        incomingPosesRef.current.shift();

        setPoseToMatch(incomingPosesRef.current[0]);
        poseToMatchRef.current = incomingPosesRef.current[0];

        console.log('New pose to match: ', poseToMatchRef.current,
            'at', MillisecondsEncoder.toMinutesSeconds(remainingTimeRef.current));
    };

    const handleGameStart = () => {
        // Set variables to default
        initialTime.current = performance.now();
        scoreRef.current = 0;
        setScore(0);
        setRemainingTime(MillisecondsEncoder.toMinutesSeconds(GAME_TIME));
        isGameStarted.current = true

        // Start interval for pose change
        onPoseChange(false);
    };

    const handleGameEnd = () => {
        setRemainingTime(MillisecondsEncoder.toMinutesSeconds(0));
        isGameStarted.current = false;
        clearInterval(poseChangeIntervalRef.current);
    };

    const debug = new URLSearchParams(location.search).get('debug')

    return (
        <MainGameStyle>
            {poseToMatch && (
                <>
                    <img src={poseImageDictionary[poseToMatch] ?? poseImageDictionary["inTheSkyMessi"]} />
                    <h1>{poseNameDictionary[poseToMatch] ?? poseNameDictionary["inTheSkyMessi"]}</h1>
                </>
            )}
            <canvas ref={canvasRef} id="canvas"></canvas>
            {debug && (
                <>
                    <div>Player pose: {playerPose.className} {playerPose.probability.toFixed(5)}</div>
                    <div>Pose to match: {poseToMatch}</div>
                    <div>Remaining Game Time: {remainingTime}</div>
                    <button type="button" onClick={handleGameStart}>Start</button>
                    <button type="button" onClick={() => isGameStarted.current = false}>Stop</button>
                </>
            )}
            <h2>{score}</h2>
            <Timer progress={remainingTimeRef.current / 600} remainingTime={remainingTime} />
        </MainGameStyle>
    );
};

export default MainGame;