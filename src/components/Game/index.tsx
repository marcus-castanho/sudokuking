import React, { FC, useState } from 'react';
import { GameController } from '../GameController';
import { GameHeader } from '../GameHeader';
import { GameBoard } from '../GameBoard';
import { Timer } from '../Timer';
import { useTimer } from '../Timer/hooks';
import { gameDisplayStyle, gameStyle } from './style';
import { CheckGameButton, SelectNewGameButton } from './components';
import './style.css';
import { useGame } from './hooks';
import { SelectedCell } from '../../@types';

export const Game: FC = () => {
    const { counter, startStopTimer, resetTimer, isOn } = useTimer();
    const counterDisplay =
        counter === 0 ? new Date().setHours(0, 0, 0) : counter;
    const { puzzle, checkGame, changeCell, wrongCells, generateNewGame } =
        useGame();
    const [selectedCell, setSelectedCell] = useState<SelectedCell>();
    const [openNewGame, setOpenNewGame] = useState(false);

    const selectCell = ({
        rowIndex,
        columnIndex,
    }: NonNullable<typeof selectedCell>) => {
        setSelectedCell({
            rowIndex,
            columnIndex,
        });
    };

    const openCloseNewGameMessage = () => {
        startStopTimer();
        setOpenNewGame((state) => !state);
    };

    const handleSelectNewGame = () => {
        generateNewGame();
        openCloseNewGameMessage();
        resetTimer();
    };

    const handleStartStopTimer = () => {
        if (openNewGame) return;
        startStopTimer();
    };

    const handleResetTimer = () => {
        if (openNewGame) return;
        resetTimer();
    };

    return (
        <div className="game" style={gameStyle}>
            <GameHeader>
                <Timer
                    {...{ counter, isOn }}
                    startStopTimer={handleStartStopTimer}
                    resetTimer={handleResetTimer}
                />
                <CheckGameButton checkGame={checkGame} />
                <SelectNewGameButton
                    openNewGameMessage={openCloseNewGameMessage}
                />
            </GameHeader>
            <div id="game-display" style={gameDisplayStyle}>
                <GameBoard
                    counterDisplay={counterDisplay}
                    startStopTimer={startStopTimer}
                    timerIsOn={isOn}
                    puzzle={puzzle}
                    selectCell={selectCell}
                    wrongCells={wrongCells}
                    openNewGame={openNewGame}
                    openCloseNewGameMessage={openCloseNewGameMessage}
                    handleSelectNewGame={handleSelectNewGame}
                />
                <GameController
                    changeCell={changeCell}
                    selectedCell={selectedCell}
                />
            </div>
        </div>
    );
};
