import React, { FC, ReactNode } from 'react';
import { CheckGameButton, SelectNewGameButton } from './components';
import { gameHeaderStyle, gameInfoStyle, gamePageStyle } from './style';

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
                <CheckGameButton />
                <SelectNewGameButton />
            </div>
        </div>
    );
};
