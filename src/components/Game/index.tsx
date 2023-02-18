import React, { FC } from 'react';
import { GameController } from '../GameController';
import { GameHeader } from '../GameHeader';
import { GameBoard } from '../GameBoard';
import { Timer } from '../Timer';
import { useTimer } from '../Timer/hooks';
import { gameDisplayStyle, gameStyle } from './style';
import './style.css';

export const Game: FC = () => {
    const { counter, startStopTimer, resetTimer, isOn } = useTimer();
    const counterDisplay =
        counter === 0 ? new Date().setHours(0, 0, 0) : counter;

    return (
        <div className="game" style={gameStyle}>
            <GameHeader>
                <Timer {...{ counter, startStopTimer, resetTimer, isOn }} />
            </GameHeader>
            <div id="game-display" style={gameDisplayStyle}>
                <GameBoard
                    counterDisplay={counterDisplay}
                    startStopTimer={startStopTimer}
                    timerIsOn={isOn}
                />
                <GameController />
            </div>
        </div>
    );
};
