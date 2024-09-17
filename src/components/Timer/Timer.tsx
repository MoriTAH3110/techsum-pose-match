import { TimerStyle } from "./Timer.styles";

interface ITimerProps {
	progress: number;
    remainingTime: string
}

const Timer = ({progress, remainingTime}: ITimerProps) => {
    return (
        <TimerStyle progress={progress}>
            <div className="chart"></div>
            <div className="cards">
                <div>{remainingTime.charAt(0)}</div>
                <div>{remainingTime.charAt(1)}</div>
                <div>{"."}</div>
                <div>{remainingTime.charAt(3)}</div>
                <div>{remainingTime.charAt(4)}</div>
            </div>
        </TimerStyle>
    );
};

export default Timer;