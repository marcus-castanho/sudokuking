import React, { FC } from 'react';
import { gameInfoStyle, timerButtonStyle, timerStyle } from './style';
import { format } from 'date-fns';
import './style.css';
import { useTimer } from './hooks';

export type TimerProps = Omit<ReturnType<typeof useTimer>, 'resetTimer'>;

export const Timer: FC<TimerProps> = ({ counter, startStopTimer, isOn }) => {
    return (
        <div id="game-info" style={gameInfoStyle}>
            <div id="timer" style={timerStyle}>
                <p style={{ fontWeight: 'bolder' }}>
                    {counter === 0
                        ? format(new Date().setHours(0, 0, 0), 'HH:mm:ss')
                        : format(counter, 'HH:mm:ss')}
                </p>
                <button
                    id="start-stop-btn"
                    className="stop"
                    style={timerButtonStyle}
                    onClick={startStopTimer}
                >
                    {isOn ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
};
