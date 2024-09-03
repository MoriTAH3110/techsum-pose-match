import { useRef, useEffect } from "react";
import { PoseData, Connection } from "../../types/BodyPose.types";
import { CanvasView } from "../Test/Test.styled";

async function startStream(video: HTMLVideoElement) {
    const stream = await window.navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let bodyPose: any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let brain: any;

let connections: Connection[] = [];

const tmModelUrl = "https://teachablemachine.withgoogle.com/models/Uk5ERsu-9/";

const brainOptions = {
    layers: [
        ml5.tf.layers.dense({
            units: 16,
            inputShape: [1],
            activation: 'relu',
        }),
        ml5.tf.layers.dense({
            units: 16,
            activation: 'sigmoid',
        }),
        ml5.tf.layers.dense({
            units: 1,
            activation: 'sigmoid',
        })
    ],
    task: "classification",
    debug: true,
};

const TeachableMachine = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const poses = useRef<PoseData[]>([]);
    //const currentPoseName = useRef<string | undefined>(undefined);

    const onPoses = (results: PoseData[]) => {
        poses.current = results;
    }

    useEffect(() => {
        // @ts-ignore
        ml5.bodyPose(
            "MoveNet", {
            model: "MULTIPOSE_LIGHTING",
        },
            // @ts-ignore
            instance => {
                bodyPose = instance
            }
        );

        if (videoRef.current) {
            startStream(videoRef.current);
        }

        //Classification
        const modelInfo = {
            model: tmModelUrl + "model.json",
            metadata: tmModelUrl + "metadata.json",
            weights: tmModelUrl + "model.weights.bin",
        };

        brain = ml5.neuralNetwork(brainOptions);

        brain.load(modelInfo, onLoadModel);
    }, [])

    useEffect(() => {
        let ref: number;
        const loop = () => {
            if (videoRef.current && canvasRef.current) {
                const ctx = canvasRef.current.getContext("2d");
                if (!ctx) {
                    return
                }
                ctx.clearRect(0, 0, 640, 480)
                ctx.drawImage(videoRef.current, 0, 0);

                bodyPose?.detect(canvasRef.current, onPoses);

                if (bodyPose) {
                    connections = bodyPose.getSkeleton();
                }

                if (poses.current.length > 0) {
                    const colors = [
                        "red",
                        "green",
                        "blue",
                        "purple",
                        "cyan"
                    ]

                    drawKeyPoints(poses.current, ctx, colors);
                    drawSkeleton(poses.current, connections, ctx, colors);
                }
            }

            ref = requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop);

        return () => {
            if (ref) {
                cancelAnimationFrame(ref);
            }
        }
    }, [])

    //Aux functions
    const drawKeyPoints = (poses: PoseData[], ctx: CanvasRenderingContext2D, colors: string[]) => {
        poses.forEach(({ keypoints }, index) => {
            keypoints.forEach(({ x, y, confidence }) => {
                if (confidence < 0.1) {
                    return;
                }
                ctx.fillStyle = colors[index % colors.length];
                ctx.fillRect(x, y, 10, 10);
            })
        })
    };

    const drawSkeleton = (poses: PoseData[], connections: Connection[], ctx: CanvasRenderingContext2D, colors: string[]) => {
        poses.forEach((pose, poseIndex) => {
            connections.forEach((connection) => {
                const pointAIndex = connection[0];
                const pointBIndex = connection[1];

                const pointA = pose.keypoints[pointAIndex];
                const pointB = pose.keypoints[pointBIndex];

                if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                    ctx.beginPath();
                    ctx.moveTo(pointA.x, pointA.y);
                    ctx.lineTo(pointB.x, pointB.y);
                    ctx.strokeStyle = colors[poseIndex % colors.length];
                    ctx.stroke();
                    ctx.closePath();
                }
            })
        });
    };

    //Train model functions
    const onLoadModel = () => {
        console.log("Model loaded");
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onHandleResult = (results: any, error: any) => {
        if (error) {
            console.error(error);
            return;
        }
        const label = results[0].label;

        console.log('🚀 ~ onHandleResult ~ label:', label);
    };

    return (
        <>
            <div>
                <video hidden ref={videoRef} />
                <CanvasView ref={canvasRef} width={640} height={480} />
            </div>

            <div>

            </div>
        </>
    );
};

export default TeachableMachine;