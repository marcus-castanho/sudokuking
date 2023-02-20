import React, { FC } from 'react';
import { GameHook } from '../../hooks';
import { checkButtonStyle } from './style';
import './style.css';

export type CheckGameButtonProps = {
    checkGame: ReturnType<GameHook>['checkGame'];
};

export const CheckGameButton: FC<CheckGameButtonProps> = ({ checkGame }) => {
    return (
        <button
            id="check-btn"
            style={checkButtonStyle}
            onClick={() => checkGame()}
        >
            Check game
        </button>
    );
};
