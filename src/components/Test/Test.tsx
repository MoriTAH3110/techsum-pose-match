import { useEffect, useRef } from "react"
import { PoseData } from "../../types/BodyPose.types";

async function startStream(video: HTMLVideoElement) {
    const stream = await window.navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
}

let bodyPose: any;

export const Test = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const poses = useRef<PoseData[]>([])

    const onPoses = (results: PoseData[]) => {
        console.log("Poses biatch", results);
        poses.current = results;
    }

    useEffect(() => {
        // @ts-ignore
        ml5.bodyPose(
            "MoveNet", undefined,
            // @ts-ignore
            instance => {
                console.log("ml5 ready");
                bodyPose = instance
            }
        );
        if( videoRef.current ){
            startStream(videoRef.current);
        }
    }, [])

    useEffect(() => {
        let ref: number;
        const loop = () => {
            if( videoRef.current && canvasRef.current ){
                const ctx = canvasRef.current.getContext("2d");
                if( !ctx ){
                    return
                }
                ctx.clearRect(0,0,640,480)
                ctx.drawImage(videoRef.current, 0, 0);

                bodyPose?.detect(canvasRef.current, onPoses);

                if( poses.current.length > 0 ){
                    const colors = [
                        "red",
                        "green",
                        "blue",
                        "purple",
                        "cyan"
                    ]
                    poses.current.forEach(({ keypoints }, index) => {
                        keypoints.forEach(({ x, y }) => {
                            ctx.fillStyle = colors[index % colors.length];
                            ctx.fillRect(x,y,10,10);
                        })
                    })
                }
            }

            ref = requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop);

        return () => {
            if( ref ){
                cancelAnimationFrame(ref);
            }
        }
    }, [])

    return <>
        <video hidden ref={videoRef}/>
        <canvas ref={canvasRef} width={640} height={480}/>
        <button onClick={() => {}}>Frame</button>
    </>
}