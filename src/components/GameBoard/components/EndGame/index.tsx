import React, { FC } from 'react';
import {
    congratulationButtonStyle,
    congratulationContainerStyle,
    congratulationStyle,
    endGameStyle,
} from './style';
import { format } from 'date-fns';

export type GameTableProps = {
    counterDisplay: number;
    handleSelectNewGame: () => void;
};

export const EndGame: FC<GameTableProps> = ({
    counterDisplay,
    handleSelectNewGame,
}) => {
    return (
        <div id="endgame" style={endGameStyle}>
            <div
                id="container-congrats-newgame"
                style={congratulationContainerStyle}
            >
                <div id="congrats-newgame" style={congratulationStyle}>
                    <p>Congratulations!</p>
                    <p id="solve-time">{format(counterDisplay, 'HH:mm:ss')}</p>
                    <div id="start-newgame-btn">
                        <button
                            style={congratulationButtonStyle}
                            onClick={() => handleSelectNewGame()}
                        >
                            START NEW GAME
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
