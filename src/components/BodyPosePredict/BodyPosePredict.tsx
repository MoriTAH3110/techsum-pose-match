import "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import { useRef, useState } from "react";
import { Pose } from "../../types/TensorFlow.types";

const webcamSpecs = {
    width: 640,
    height: 480,
    flipped: true
};

const BodyPosePredict: React.FC = () => {
    //URL for the trained model
    const URL = "https://teachablemachine.withgoogle.com/models/ybrnIyoF9/"

    //Refs
    const modelRef = useRef<tmPose.CustomPoseNet | null>(null);
    const maxPredictions = useRef(0);
    const [labels, setLabels] = useState<string[]>([]);
    const webcamRef = useRef<tmPose.Webcam | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);


    //Load the model and set up webcam
    const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        const loadedModel = await tmPose.load(modelURL, metadataURL);
        modelRef.current = loadedModel;
        maxPredictions.current = loadedModel.getTotalClasses();

        const webcam = new tmPose.Webcam(webcamSpecs.width, webcamSpecs.height, webcamSpecs.flipped);
        await webcam.setup();
        await webcam.play();
        webcamRef.current = webcam;
        window.requestAnimationFrame(loop);

        const canvas = document.getElementById("canvas") as HTMLCanvasElement;

        if (canvas) {
            canvas.width = webcamSpecs.width;
            canvas.height = webcamSpecs.height;
            ctxRef.current = canvas.getContext('2d');
        }

        setLabels(new Array(loadedModel.getTotalClasses()).fill(''));

    };

    const loop = async () => {
        webcamRef.current?.update();
        await predict();
        window.requestAnimationFrame(loop);
    };

    //PREDICTION
    const predict = async () => {
        if (modelRef.current && webcamRef.current) {
            const { pose, posenetOutput } = await modelRef.current.estimatePose(webcamRef.current.canvas);
            const predictions = await modelRef.current.predict(posenetOutput);

            const newLabels = predictions.map((prediction) => {
                const classPrediction = `${prediction.className}: ${prediction.probability.toFixed(2)}`;
                return classPrediction;
            })

            setLabels(newLabels);

            drawPose(pose);
        }
    };

    //DRAW FUNCTIONS
    const drawPose = (pose: Pose) => {
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
            {
                labels.map((label) => (
                    <div key={label}>{label}</div>
                ))
            }
        </div>
    );
};

export default BodyPosePredict;