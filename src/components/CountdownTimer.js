import { useState,useEffect } from "react";
import {getRemainingTimeUntilMsTimestamp} from './CountdownUtils';


const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00'
}

const CountdownTimer  = ({countdownTimestampMS, text}) => {

    
    const [remainingTime, setRemainingTime]  = useState(defaultRemainingTime);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMS);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMS])

    function updateRemainingTime (countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }
    

    return (
        <div>
            <div className="countdown-timer">
                <span className={text}>{remainingTime.hours}</span>
                <span className={text}>h</span>
                <span className={text}>{remainingTime.minutes}</span>
                <span className={text}>min</span>
                <span className={text}>{remainingTime.seconds}</span>
                <span className={text}>sec</span>
            </div>
        </div>
        
    );
}
export default CountdownTimer;