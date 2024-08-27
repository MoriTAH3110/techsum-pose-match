import { useEffect, useRef } from "react"
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

export const Test = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const poses = useRef<PoseData[]>([])

    const onPoses = (results: PoseData[]) => {
        poses.current = results;
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

    return <>
        <video hidden ref={videoRef} />
        <CanvasView ref={canvasRef} width={640} height={480} />
    </>
}