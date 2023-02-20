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
    const { puzzle, checkGame, changeCell, wrongCells } = useGame();
    const [selectedCell, setSelectedCell] = useState<SelectedCell>();

    const handleSelectCell = ({
        rowIndex,
        columnIndex,
    }: NonNullable<typeof selectedCell>) => {
        setSelectedCell({
            rowIndex,
            columnIndex,
        });
    };

    return (
        <div className="game" style={gameStyle}>
            <GameHeader>
                <Timer {...{ counter, startStopTimer, resetTimer, isOn }} />
                <CheckGameButton checkGame={checkGame} />
                <SelectNewGameButton />
            </GameHeader>
            <div id="game-display" style={gameDisplayStyle}>
                <GameBoard
                    counterDisplay={counterDisplay}
                    startStopTimer={startStopTimer}
                    timerIsOn={isOn}
                    puzzle={puzzle}
                    handleSelectCell={handleSelectCell}
                    wrongCells={wrongCells}
                />
                <GameController
                    changeCell={changeCell}
                    selectedCell={selectedCell}
                />
            </div>
        </div>
    );
};
