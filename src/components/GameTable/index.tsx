import React, { FC, useEffect, useState } from 'react';
import { gameTableContainerStyle } from './style';
import { EndGame, HiddenGame } from './components';

export type GameTableProps = {
    counterDisplay: number;
    startStopTimer: () => void;
};

export const GameTable: FC<GameTableProps> = ({
    counterDisplay,
    startStopTimer,
}) => {
    const [gameHasEnded, setGameHasEnded] = useState(false);

    //remover apos implementar jogo
    useEffect(() => {
        setGameHasEnded(true);
    }, []);

    return (
        <div id="game-table-container" style={gameTableContainerStyle}>
            {gameHasEnded ? (
                <EndGame counterDisplay={counterDisplay} />
            ) : (
                <HiddenGame startStopTimer={startStopTimer} />
            )}
        </div>
    );
};
