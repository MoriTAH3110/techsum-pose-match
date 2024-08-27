import Webcam from 'react-webcam';
import styled from 'styled-components';

export const WebcamView = styled(Webcam)`
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 640px;
    height: 480px;
    z-index: 10;
`;

export const OverlayCanvas = styled.canvas`
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 640px;
    height: 480px;
    z-index: 10;
`;