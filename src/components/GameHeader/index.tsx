import React from 'react';
import {
    checkButtonStyle,
    gameHeaderStyle,
    gameInfoStyle,
    gamePageStyle,
} from './style';
import './style.css';
import { Timer } from '../Timer';

export const GameHeader = () => {
    return (
        <div id="game-page" style={gamePageStyle}>
            <div id="game-header" style={gameHeaderStyle}>
                <div id="game-info" style={gameInfoStyle}>
                    <Timer />
                </div>
                <button
                    id="check-btn"
                    style={checkButtonStyle}
                    onClick={
                        () => console.log('checkEntries')
                        // this.checkEntries()
                    }
                >
                    Check game
                </button>
                <div id="select-newgame">
                    <button
                        id="btn-newgame"
                        onClick={
                            () => console.log('handleButtonClick')
                            // this.handleButtonClick('newgameOpt')
                        }
                    >
                        New Game
                    </button>
                </div>
            </div>
        </div>
    );
};
