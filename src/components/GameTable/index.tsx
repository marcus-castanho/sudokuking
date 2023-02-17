import React, { FC, useEffect, useState } from 'react';
import { gameTableContainerStyle } from './style';
import { EndGame, HiddenGame, SelecNewGameMessage } from './components';
import { match } from 'ts-pattern';

export type GameTableProps = {
    counterDisplay: number;
    startStopTimer: () => void;
};

export const GameTable: FC<GameTableProps> = ({
    counterDisplay,
    startStopTimer,
}) => {
    const [gameState, steGameState] = useState<
        'on' | 'paused' | 'ended' | 'selectNewGame'
    >('on');

    //remover apos implementar jogo
    useEffect(() => {
        steGameState('ended');
    }, []);

    return (
        <>
            <div id="game-table-container" style={gameTableContainerStyle}>
                {match(gameState)
                    .with('on', () => <p>GameTable</p>)
                    .with('paused', () => (
                        <HiddenGame startStopTimer={startStopTimer} />
                    ))
                    .with('ended', () => (
                        <EndGame counterDisplay={counterDisplay} />
                    ))
                    .with('selectNewGame', () => <SelecNewGameMessage />)
                    .otherwise(() => (
                        <></>
                    ))}
            </div>
        </>
    );
};
