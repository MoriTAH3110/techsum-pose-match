import * as tf from "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";

import { useEffect, useRef, useState } from "react";
import { Pose } from "../../types/TensorFlow.types";
import { MillisecondsEncoder } from "../../utils/format.utils";

const WEBCAM_SPECS = {
    width: 640,
    height: 480,
    flip: true
};

const MainGame = () => {
    //URL for the trained model
    const URL = "https://teachablemachine.withgoogle.com/models/ybrnIyoF9/"

    //Refs
    const webcamRef = useRef<tmPose.Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const modelRef = useRef<tmPose.CustomPoseNet | null>(null);
    const maxPredictions = useRef(0);

    //state
    const [currentPose, setCurrentPose] = useState<string | null>(null);

    //GAMEPLAY
    let frameSkipCounter = 0;
    const GAME_TIME = 3 * 60 * 1000; //3 minutes
    const initialTime = useRef<number>(0);
    const [remainingTime, setRemainingTime] = useState<string>('03:00');
    const gameStarted = useRef<boolean>(false);

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
            maxPredictions.current = loadedModel.getTotalClasses();

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

        console.log('🚀 ~ update ~ gameStarted:', gameStarted);

        if (gameStarted.current) {
            const timeDiff = (timestamp - initialTime.current);
            const timeLeft = GAME_TIME - timeDiff;
            setRemainingTime(MillisecondsEncoder.toMinutesSeconds(timeLeft));
        }

        //#endregion
        requestAnimationFrame(update);
    };

    //Aux functions
    const predict = async () => {
        if (modelRef.current && webcamRef.current) {
            const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas);
            const predictions = await modelRef.current.predict(posenetOutput);

            if (predictions.length > 0) {
                const highestPrediction = predictions.filter((p) => p.probability > 0.75)[0];

                setCurrentPose(highestPrediction ? highestPrediction.className : '');
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

    const handleGameStart = () => {
        initialTime.current = performance.now();
        setRemainingTime('03:00');
        gameStarted.current = true
    };

    return (
        <>
            <canvas ref={canvasRef} id="canvas"></canvas>
            <div>Current pose: {currentPose}</div>
            <div>Remaining Time: {remainingTime}</div>
            <button type="button" onClick={handleGameStart}>Start</button>
            <button type="button" onClick={() => gameStarted.current = false}>Stop</button>
        </>
    );
};

export default MainGame;