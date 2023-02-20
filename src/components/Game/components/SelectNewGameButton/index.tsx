import React, { FC } from 'react';
import { buttonNewGameStyle } from './style';
import './style.css';

export type SelectNewGameButtonProps = {
    openNewGameMessage: () => void;
};

export const SelectNewGameButton: FC<SelectNewGameButtonProps> = ({
    openNewGameMessage,
}) => {
    return (
        <div id="select-newgame" style={{ color: '#000' }}>
            <button
                id="btn-newgame"
                style={buttonNewGameStyle}
                onClick={() => openNewGameMessage()}
            >
                New Game
            </button>
        </div>
    );
};
