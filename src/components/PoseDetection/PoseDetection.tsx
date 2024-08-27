import { useRef } from 'react';
import { WebcamView, OverlayCanvas } from '../WebcamFeed/WebcamFeed.styled';
import Webcam from 'react-webcam';
import { Connection, PoseData } from '../../types/BodyPose.types';

let poses: PoseData[] = [];
let connections: Connection[] = [];

const PoseDetection = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);

    //Start
    const runBodyPose = async () => {
        const bodyPose = ml5.bodyPose(
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
        );

        setInterval(() => {
            detect(bodyPose);
        }, 100);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const detect = async (bodyPose: any) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            // Get video properties
            const video = webcamRef.current.video as HTMLVideoElement;
            const videoWidth = webcamRef.current.video.width;
            const videoHeight = webcamRef.current.video.height;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Make detections
            await bodyPose.detectStart(video, gotPoses);
            connections = bodyPose.getSkeleton();

            drawCanvas(videoWidth, videoHeight, canvasRef.current!);
        }
    };

    const drawCanvas = (width: number, height: number, canvasRef: HTMLCanvasElement) => {
        const ctx = canvasRef.getContext("2d");
        canvasRef.width = width;
        canvasRef.height = height;

        if (poses) {
            // ctx?.beginPath();
            // ctx?.arc(poses[0].nose.x, poses[0].nose.y, 400, 0, 2 * Math.PI);
            // ctx?.fill();
            // ctx?.stroke();
        }

        // poses.forEach((pose) => {
        //     connections.forEach((connection) => {
        //         const pointAIndex = connection[0];
        //         const pointBIndex = connection[1];

        //         const pointA = pose.keypoints[pointAIndex];
        //         const pointB = pose.keypoints[pointBIndex];

        //         if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        //             if (ctx) {
        //                 ctx.beginPath();
        //                 ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        //                 ctx.stroke();
        //             }
        //         }
        //     })
        // });
    };

    runBodyPose();

    //aux func
    const gotPoses = (results: PoseData[]) => {

        console.log('🚀 ~ gotPoses ~ results:', results);
        poses = results;
    }

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

export default PoseDetection;