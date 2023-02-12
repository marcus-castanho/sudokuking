import React, { FC } from 'react';
import { useTimer } from './hooks';
import { startStopButtonStyle, timerStyle } from './style';
import { format } from 'date-fns';
import './style.css';

export const Timer: FC = () => {
    const { counter, startStopTimer, resetTimer } = useTimer();

    return (
        <div id="timer" style={timerStyle}>
            <p style={{ fontWeight: 'bolder' }}>
                {counter === 0
                    ? format(new Date().setHours(0, 0, 0), 'HH:mm:ss')
                    : format(counter, 'HH:mm:ss')}
            </p>
            <button
                id="start-stop-btn"
                className="stop"
                style={startStopButtonStyle}
                onClick={startStopTimer}
            >
                Start/Stop
            </button>
            <button style={startStopButtonStyle} onClick={resetTimer}>
                reset{' '}
            </button>
        </div>
    );
};
