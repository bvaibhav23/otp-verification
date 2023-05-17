import React, { useEffect } from 'react'

const Timer = ({ minutes, seconds, setMinutes, setSeconds }) => {

    // const resendOTP = () => {
    //     setMinutes(0);
    //     setSeconds(10);
    // };
    // useEffect(() => { resendOTP(); }, [OTP]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);
    return (<>
        {seconds > 0 || minutes > 0 ? (
            <p>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </p>
        ) : (
            <p>Didn't receive code?</p>
        )}
    </>

    )
}

export default Timer;