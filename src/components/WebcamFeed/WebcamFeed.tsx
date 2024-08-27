import { useEffect, useRef } from "react";
import { OverlayCanvas, WebcamView } from "./WebcamFeed.styled";
import Webcam from "react-webcam";
import { Connection, PoseData } from "../../types/BodyPose.types";


let bodyPose;
let poses: PoseData[] = [];
let connections: Connection[] = [];

const WebcamFeed = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);

    //start
    useEffect(() => {
        bodyPose = ml5.bodyPose(
            "MoveNet",
            {
                modelType: "SINGLEPOSE_LIGHTNING",
                enableSmoothing: true,
                minPoseScore: 0.25,
                multiPoseMaxDimension: 256,
                enableTracking: true,
                trackerType: "boundingBox",
                trackerConfig: {},
                modelUrl: undefined,
                flipped: false
            },
            () => {
                console.log("Model is ready!");
            }
        );
    }, []);


    // draw loop
    useEffect(() => {
        let ref: number;
        const loop = () => {
            if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
                //Get video properties
                const video = webcamRef.current.video as HTMLVideoElement;
                const videoWith = webcamRef.current.video.width;
                const videoHeight = webcamRef.current.video.height;

                //Set video width
                webcamRef.current.video.width = videoWith;
                webcamRef.current.video.height = videoHeight;

                //Make detections
                bodyPose.detect(video, gotPoses);
                connections = bodyPose.getSkeleton();

                //Draw skeleton
                drawCanvas(videoWith, videoHeight, canvasRef.current!);
            }

            ref = window.requestAnimationFrame(loop)
        }

        window.requestAnimationFrame(loop)
        return () => {
            if (ref) {
                window.cancelAnimationFrame(ref);
            }
        }
    }, [])

    // functions
    const gotPoses = (results: PoseData[]) => {

        console.log('🚀 ~ gotPoses ~ results:', results);
        
        poses = results;
    }

    const drawCanvas = (videoWidth: number, videoHeight: number, canvas: React.MutableRefObject<HTMLCanvasElement>) => {
        poses.forEach((pose) => {
            connections.forEach((connection) => {
                const pointAIndex = connection[0];
                const pointBIndex = connection[1];

                const pointA = pose.keypoints[pointAIndex];
                const pointB = pose.keypoints[pointBIndex];

                if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
                    //console.log(pointA, pointB);
                    const ctx = canvas.current.getContext("2d");
                    canvas.current.width = videoWidth;
                    canvas.current.height = videoHeight;

                    if (ctx) {
                        ctx.beginPath();
                        ctx.moveTo(pointA.x, pointA.y);
                        ctx.lineTo(pointB.x, pointB.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            })
        });
    };

    return (
        <>
            <WebcamView
                ref={webcamRef}
                mirrored={true}

            />
            <OverlayCanvas ref={canvasRef} />
        </>
    );
};

export default WebcamFeed;