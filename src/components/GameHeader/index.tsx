import React, { FC, ReactNode } from 'react';
import { gameHeaderStyle, gamePageStyle } from './style';

export type GameHeaderProps = {
    children: ReactNode;
};

export const GameHeader: FC<GameHeaderProps> = ({ children }) => {
    return (
        <div id="game-page" style={gamePageStyle}>
            <div id="game-header" style={gameHeaderStyle}>
                {children}
            </div>
        </div>
    );
};
