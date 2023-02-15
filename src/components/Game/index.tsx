import React, { FC } from 'react';
import { GameHeader } from '../GameHeader';
import { GameTable } from '../GameTable';
import { Timer } from '../Timer';
import { useTimer } from '../Timer/hooks';
import {
    controllerTableStyle,
    gameBoardStyle,
    gameControllerStyle,
    gameDisplayStyle,
    gameStyle,
} from './style';
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
                <div id="game-board" style={gameBoardStyle}>
                    <GameTable counterDisplay={counterDisplay} />
                </div>
                <div id="game-controller" style={gameControllerStyle}>
                    <table id="controller-table" style={controllerTableStyle}>
                        {
                            <></>
                            // this.renderController()
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};
