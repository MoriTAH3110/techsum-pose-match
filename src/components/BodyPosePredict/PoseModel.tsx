import React, { useState, useRef, useEffect } from 'react';
import '@tensorflow/tfjs'; // Import TensorFlow.js
import * as tmPose from '@teachablemachine/pose'; // Import Teachable Machine Pose library

const PoseModel: React.FC = () => {
    const URL = "https://teachablemachine.withgoogle.com/models/L71vjtyQV/";
    const [model, setModel] = useState<tmPose.CustomPoseNet | null>(null);
    const [maxPredictions, setMaxPredictions] = useState(0);
    const [labelContainer, setLabelContainer] = useState<HTMLDivElement[]>([]);

    const webcamRef = useRef<tmPose.Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    // Load the model and setup the webcam
    const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        const loadedModel = await tmPose.load(modelURL, metadataURL);
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());

        const webcam = new tmPose.Webcam(200, 200, true); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        webcamRef.current = webcam;
        window.requestAnimationFrame(loop);

        // Set up canvas and label container
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = 200;
            canvas.height = 200;
            ctxRef.current = canvas.getContext('2d');
        }

        setLabelContainer(new Array(loadedModel.getTotalClasses()).fill(''));
    };

    const loop = async (timestamp?: number) => {
        webcamRef.current?.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    };

    const predict = async () => {
        if (model && webcamRef.current) {
            const { pose, posenetOutput } = await model.estimatePose(webcamRef.current.canvas);
            const predictions = await model.predict(posenetOutput);

            const newLabels = predictions.map((prediction, i) => {
                const classPrediction = `${prediction.className}: ${prediction.probability.toFixed(2)}`;
                return classPrediction;
            });

            setLabelContainer(newLabels);

            // Control audio based on prediction
            if (predictions[0].probability >= 0.75) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }

            drawPose(pose);
        }
    };

    const drawPose = (pose: any) => {
        const ctx = ctxRef.current;
        if (ctx && webcamRef.current?.canvas) {
            ctx.drawImage(webcamRef.current.canvas, 0, 0);
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    };

    return (
        <div>
            <div>Teachable Machine Pose Model</div>
            <button type="button" onClick={init}>Start</button>
            <div>
                <canvas ref={canvasRef} id="canvas"></canvas>
            </div>
            <div id="label-container">
                {labelContainer.map((label, i) => (
                    <div key={i}>{label}</div>
                ))}
            </div>
            <br /><br /><br /><br />
            <audio ref={audioRef} id="wakeUpAudio">
                <source src="wakeupalarm.mp3" type="audio/mpeg" />
                Your browser does not support HTML5 audio.
            </audio>
        </div>
    );
};

export default PoseModel;
