import { useEffect, useRef, useState } from "react"
import { Connection, PoseData } from "../../types/BodyPose.types";
import { CanvasView } from "./Test.styled";

async function startStream(video: HTMLVideoElement) {
    const stream = await window.navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let bodyPose: any;

let connections: Connection[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let brain: any;

export const Test = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const poses = useRef<PoseData[]>([]);
    const appState = useRef<string>("idle");
    const currentPoseName = useRef<string | undefined>(undefined);

    const brainOptions = {
        inputs: 34, // 17 keypoints with x and y coordinates
        outputs: 2, // number of poses to recognize
        task: "classification",
        debug: true,
    };

    const onPoses = (results: PoseData[]) => {
        poses.current = results;

        if (appState.current === "training") {
            const inputs: number[] = [];

            results.forEach(({ keypoints }) => {
                keypoints.forEach(({ x, y }) => {
                    inputs.push(x);
                    inputs.push(y);
                });
            })

            const poseName: string = currentPoseName === undefined ? "" : currentPoseName;

            console.log("Adding example for pose: ", currentPoseName);
            console.log("Inputs: ", inputs);

            brain.addData(inputs, poseName);
        };
    }

    useEffect(() => {
        // @ts-ignore
        ml5.bodyPose(
            "MoveNet", {
            model: "SINGLEPOSE_LIGHTING",
        },
            // @ts-ignore
            instance => {
                bodyPose = instance
            }
        );
        if (videoRef.current) {
            startStream(videoRef.current);
        }

        brain = ml5.neuralNetwork(brainOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    connections = bodyPose?.getSkeleton();
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
    const delay = (msToWait: number, action: () => void) =>
        new Promise(resolve => setTimeout(() => resolve(action()), msToWait));

    const handleOnTrain = async () => {
        await delay(1000, () => console.log("countdown!"))

        await delay(3000, () => {
            console.log("start training");

            appState.current = "training";
        });

        await delay(5000, () => appState.current = "idle");
    };

    const handleInputPoseName = (e: React.ChangeEvent<HTMLInputElement>) => {
        currentPoseName.current = e.target.value;
    }

    const handleOnSaveData = () => {
        brain.saveData(currentPoseName, () => console.log("Data saved!"));
    };

    return (
        <>
            <div>
                <video hidden ref={videoRef} />
                <CanvasView ref={canvasRef} width={640} height={480} />
            </div>

            <div>
                <input type="text" placeholder="Pose Name" onChange={handleInputPoseName} />

                <button
                    onClick={handleOnTrain}
                    disabled={currentPoseName?.length === 0 || currentPoseName === undefined}
                >
                    Get training data
                </button>

                <button onClick={handleOnSaveData}>Save Data</button>
            </div>
        </>
    );
}