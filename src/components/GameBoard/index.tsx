import React, { FC, useEffect, useState } from 'react';
import { gameBoardStyle, gameTableContainerStyle } from './style';
import { EndGame, HiddenGame, SelecNewGameMessage, Table } from './components';
import { match } from 'ts-pattern';
import type { GameHook } from '../Game/hooks';
import { SelectedCell } from '../../@types';

export type GameBoardProps = {
    counterDisplay: number;
    startStopTimer: () => void;
    timerIsOn: boolean;
    puzzle: ReturnType<GameHook>['puzzle'];
    selectCell: ({ rowIndex, columnIndex }: SelectedCell) => void;
    wrongCells: ReturnType<GameHook>['wrongCells'];
};

export const GameBoard: FC<GameBoardProps> = ({
    counterDisplay,
    startStopTimer,
    timerIsOn,
    puzzle,
    selectCell,
    wrongCells,
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

    useEffect(() => {
        setGameState('on');
    }, []);

    return (
        <div id="game-board" style={gameBoardStyle}>
            <div id="game-table-container" style={gameTableContainerStyle}>
                {match(gameState)
                    .with('on', () => (
                        <Table
                            puzzle={puzzle}
                            selectCell={selectCell}
                            wrongCells={wrongCells}
                        />
                    ))
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
