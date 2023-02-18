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
};

export const EndGame: FC<GameTableProps> = ({ counterDisplay }) => {
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
    );
};
