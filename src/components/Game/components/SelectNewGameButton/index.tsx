import React from 'react';
import { buttonNewGameStyle } from './style';
import './style.css';

export const SelectNewGameButton = () => {
    return (
        <div id="select-newgame" style={{ color: '#000' }}>
            <button
                id="btn-newgame"
                style={buttonNewGameStyle}
                onClick={
                    () => console.log('handleButtonClick')
                    // this.handleButtonClick('newgameOpt')
                }
            >
                New Game
            </button>
        </div>
    );
};
