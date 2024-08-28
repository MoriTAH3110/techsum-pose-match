import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let brain: any;

export const Training = () => {
    const brainOptions = {
        inputs: 34, // 17 keypoints with x and y coordinates
        outputs: 2, // number of poses to recognize
        task: "classification",
        debug: true,
    };

    useEffect(() => {
        brain = ml5.neuralNetwork(brainOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // callbacks
    const dataLoaded = () => {
        brain.normalizeData();
        brain.train({ epochs: 50 }, trainingFinished);
    };

    const trainingFinished = () => {
        console.log('model trained');
        brain.save();
    };

    //aux func
    const handleOnChooseFile = () => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleOnLoadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            brain.loadData(file, dataLoaded);
        }
    };

    return (
        <>
            <h1>Training</h1>
            <>
                <button onClick={handleOnChooseFile}>Select File</button>
                <input
                    id="fileInput"
                    type="file"
                    accept=".json"
                    style={{ display: 'none' }}
                    onChange={handleOnLoadFile}
                />
            </>
        </>
    );
};