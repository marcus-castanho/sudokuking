import React, { FC } from 'react';
import { Footer, GameHeader, Header, Timer } from '../../components';
import { useTimer } from '../../components/Timer/hooks';
import { format } from 'date-fns';
import {
    congratulationButtonStyle,
    congratulationContainerStyle,
    congratulationStyle,
    controllerTableStyle,
    endGameStyle,
    gameBoardStyle,
    gameControllerStyle,
    gameDisplayStyle,
    gameStyle,
    gameTableContainerStyle,
} from './style';

export const Main: FC = () => {
    const { counter, startStopTimer, resetTimer, isOn } = useTimer();
    const counterDisplay =
        counter === 0 ? new Date().setHours(0, 0, 0) : counter;

    return (
        <>
            <Header />
            <div className="game" style={gameStyle}>
                <GameHeader>
                    <Timer {...{ counter, startStopTimer, resetTimer, isOn }} />
                </GameHeader>
                <div id="game-display" style={gameDisplayStyle}>
                    <div id="game-board" style={gameBoardStyle}>
                        <div
                            id="game-table-container"
                            style={gameTableContainerStyle}
                        >
                            <div id="endgame" style={endGameStyle}>
                                <div
                                    id="container-congrats-newgame"
                                    style={congratulationContainerStyle}
                                >
                                    <div
                                        id="congrats-newgame"
                                        style={congratulationStyle}
                                    >
                                        <p>Congratulations!</p>
                                        <p id="solve-time">
                                            {format(counterDisplay, 'HH:mm:ss')}
                                        </p>
                                        <div id="start-newgame-btn">
                                            <button
                                                style={
                                                    congratulationButtonStyle
                                                }
                                                onClick={() => {
                                                    console.log('newgame');
                                                    // this.newgame('easy');
                                                }}
                                            >
                                                START NEW GAME
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="game-controller" style={gameControllerStyle}>
                        <table
                            id="controller-table"
                            style={controllerTableStyle}
                        >
                            {
                                <></>
                                // this.renderController()
                            }
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
