import React, { FC, ReactNode } from 'react';
import {
    checkButtonStyle,
    gameHeaderStyle,
    gameInfoStyle,
    gamePageStyle,
} from './style';
import './style.css';

export type GameHeaderProps = {
    children: ReactNode;
};

export const GameHeader: FC<GameHeaderProps> = ({ children }) => {
    return (
        <div id="game-page" style={gamePageStyle}>
            <div id="game-header" style={gameHeaderStyle}>
                <div id="game-info" style={gameInfoStyle}>
                    {children}
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
