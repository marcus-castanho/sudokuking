import { useState } from 'react';
import sudoku from 'sudoku-umd';
import { GameInputValue, NumericRange } from '../../../../@types';
import {
    convert1DIndexTo2DIndex,
    convert2DIndexTo1DIndex,
    getImmutableIndexes,
} from './utils';

export type GameHook = (difficulty?: 'easy' | 'medium' | 'hard') => {
    puzzle: string[][];
    changeCell: ({
        value,
        rowIndex,
        columnIndex,
    }: {
        value: GameInputValue;
        rowIndex: NumericRange<0, 8>;
        columnIndex: NumericRange<0, 8>;
    }) => void;
    checkGame: () => void;
    wrongCells: { rowIndex: number; columnIndex: number }[];
    generateNewGame: (newDifficulty?: 'easy' | 'medium' | 'hard') => void;
};

export const useGame: GameHook = (difficulty = 'easy') => {
    const newPuzzle = sudoku.generate(difficulty);
    const [puzzle, setPuzzle] = useState<string>(newPuzzle);
    const [solvedPuzzle, setSolvedPuzzle] = useState<string>(
        sudoku.solve(newPuzzle),
    );
    const [immutableIndexes, setImmutableIndexes] = useState<number[]>(() =>
        getImmutableIndexes(puzzle),
    );
    const [wrongCells, setWrongCells] = useState<
        { rowIndex: number; columnIndex: number }[]
    >([]);
    const puzzleAsGrid: string[][] = sudoku.board_string_to_grid(
        puzzle.replaceAll('.', ' '),
    );

    const changeCell = ({
        value,
        rowIndex,
        columnIndex,
    }: {
        value: GameInputValue;
        rowIndex: NumericRange<0, 8>;
        columnIndex: NumericRange<0, 8>;
    }) => {
        const newValue = value === ' ' ? '.' : value;
        const indexToReplace = convert2DIndexTo1DIndex(rowIndex, columnIndex);

        if (immutableIndexes.includes(indexToReplace)) return;

        const newPuzzleState =
            puzzle.slice(0, indexToReplace) +
            newValue +
            puzzle.slice(indexToReplace + 1);

        setPuzzle(newPuzzleState);

        const newSolvedPuzzle = sudoku.solve(puzzle);

        if (newSolvedPuzzle) {
            setSolvedPuzzle(newSolvedPuzzle);
        }
    };

    const checkGame = () => {
        const newWrongCells: { rowIndex: number; columnIndex: number }[] = [];

        puzzle.split('').forEach((value, index) => {
            const rightValue = solvedPuzzle[index];

            if (value !== rightValue && value !== '.') {
                const [rowIndex, columnIndex] = convert1DIndexTo2DIndex(
                    index as NumericRange<0, 80>,
                );
                newWrongCells.push({ rowIndex, columnIndex });
            }
        });

        setWrongCells([...newWrongCells]);
    };

    const generateNewGame: ReturnType<GameHook>['generateNewGame'] = (
        newDifficulty = 'easy',
    ) => {
        const newPuzzle = sudoku.generate(newDifficulty);

        setPuzzle(newPuzzle);
        setSolvedPuzzle(sudoku.solve(newPuzzle));
        setImmutableIndexes(() => getImmutableIndexes(newPuzzle));
        setWrongCells([]);
    };

    return {
        puzzle: puzzleAsGrid,
        changeCell,
        checkGame,
        wrongCells,
        generateNewGame,
    };
};
