import React, { FC, useRef } from 'react';
import {
    buttonNewGameStyle,
    selectNewGameDropdownStyle,
    selectNewGameItem,
    selectNewGameStyle,
} from './style';
import './style.css';

export type SelecNewGameMessageProps = {
    handleSelectNewGame: () => void;
    openCloseNewGameMessage: () => void;
};

export const SelecNewGameMessage: FC<SelecNewGameMessageProps> = ({
    handleSelectNewGame,
    openCloseNewGameMessage,
}) => {
    const newGameDropDownRef = useRef(null);

    return (
        <div
            id="selec-newgame-dropdown"
            style={selectNewGameDropdownStyle}
            ref={newGameDropDownRef}
        >
            <div className="selec-newgame-item" style={selectNewGameItem}>
                <div className="selec-newgame" style={selectNewGameStyle}>
                    Are you sure you want to start a new game?
                </div>
                <div id="restart-game-opt">
                    <button
                        onClick={handleSelectNewGame}
                        style={buttonNewGameStyle}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => openCloseNewGameMessage()}
                        style={buttonNewGameStyle}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};
