import React, { FC, useEffect, useState } from 'react';
import { gameBoardStyle, gameTableContainerStyle } from './style';
import { EndGame, HiddenGame, SelecNewGameMessage, Table } from './components';
import { match } from 'ts-pattern';

export type GameBoardProps = {
    counterDisplay: number;
    startStopTimer: () => void;
    timerIsOn: boolean;
};

export const GameBoard: FC<GameBoardProps> = ({
    counterDisplay,
    startStopTimer,
    timerIsOn,
}) => {
    const [gameState, setGameState] = useState<
        'on' | 'paused' | 'ended' | 'selectNewGame'
    >('on');

    const handleUnpauseGame = () => {
        startStopTimer();
        setGameState('on');
    };

    useEffect(() => {
        match(timerIsOn)
            .with(true, () => setGameState('on'))
            .with(false, () => setGameState('paused'))
            .otherwise(() => {
                return;
            });
    }, [timerIsOn]);

    //remover apos implementar jogo
    useEffect(() => {
        setGameState('on');
    }, []);

    return (
        <div id="game-board" style={gameBoardStyle}>
            <div id="game-table-container" style={gameTableContainerStyle}>
                {match(gameState)
                    .with('on', () => <Table />)
                    .with('paused', () => (
                        <HiddenGame handleUnpauseGame={handleUnpauseGame} />
                    ))
                    .with('ended', () => (
                        <EndGame counterDisplay={counterDisplay} />
                    ))
                    .with('selectNewGame', () => <SelecNewGameMessage />)
                    .otherwise(() => (
                        <></>
                    ))}
            </div>
        </div>
    );
};
