import React, { FC, useEffect, useState } from 'react';
import { gameTableContainerStyle } from './style';
import { EndGame } from './components';

export type GameTableProps = {
    counterDisplay: number;
};

export const GameTable: FC<GameTableProps> = ({ counterDisplay }) => {
    const [gameHasEnded, setGameHasEnded] = useState(false);

    //remover apos implementar jogo
    useEffect(() => {
        setGameHasEnded(true);
    }, []);

    return (
        <div id="game-table-container" style={gameTableContainerStyle}>
            {gameHasEnded ? <EndGame counterDisplay={counterDisplay} /> : <></>}
        </div>
    );
};
