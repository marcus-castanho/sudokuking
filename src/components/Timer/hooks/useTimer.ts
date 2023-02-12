import { useState } from 'react';

/** @function startStopTimer */
/** @function resetTimer */
/**
 * @return {Timer} Timer object
 * @return {number} Timer.counter - Value of timer counter in miliseconds - 0 if the timer is reset
 * @return {startStopTimer} Timer.startStopTimer
 * @return {resetTimer} Timer.resetTimer
 * @return {boolean} Timer.isOn
 */
export const useTimer = () => {
    const [timerCounter, setTimerCounter] = useState({
        value: 0,
        startTime: 0,
        isOn: false,
    });
    const [timerId, setTimerId] = useState<number>();

    const timerFn = () =>
        setTimerCounter((state) => {
            const { value } = state;
            const now = Date.now();
            const midnightTime = new Date(now).setHours(0, 0, 0);
            const startTime =
                state.startTime === 0 ? midnightTime : state.startTime;
            const updatedValue = value === 0 ? midnightTime : value + 1000;
            return {
                value: updatedValue,
                startTime,
                isOn: true,
            };
        });

    const startTimer = async () => {
        timerFn();
        setTimerId(setInterval(timerFn, 1000));
    };

    const stopTimer = async () => {
        setTimerCounter((state) => {
            if (timerId) {
                clearInterval(timerId);
            }
            return { ...state, isOn: false };
        });
    };

    const startStopTimer = () => {
        const { isOn } = timerCounter;
        if (isOn) {
            stopTimer();
        } else {
            startTimer();
        }
    };

    const resetTimer = () => {
        setTimerCounter(() => {
            if (timerId) {
                clearInterval(timerId);
            }
            return { value: 0, startTime: 0, isOn: false };
        });
    };

    return {
        counter: timerCounter.value,
        startStopTimer,
        resetTimer,
        isOn: timerCounter.isOn,
    };
};
