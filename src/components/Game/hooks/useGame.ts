import { useCallback, useState } from 'react';
import sudoku from 'sudoku-umd';
import { GameInputValue, NumericRange } from '../../../@types';

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
    checkGame: () => {
        row: number;
        column: number;
    }[];
};

export const useGame: GameHook = (difficulty = 'easy') => {
    const newPuzzle = sudoku.generate(difficulty);
    const [puzzle, setPuzzle] = useState<string>(newPuzzle);
    const [solvedPuzzle, setSolvedPuzzle] = useState<string>(
        sudoku.solve(newPuzzle),
    );
    const [immutableIndexes] = useState<number[]>(() => {
        const indexes = puzzle
            .split('')
            .map((value, index) => (value === '.' ? -1 : index))
            .filter((element) => element !== -1);

        return indexes;
    });
    const puzzleAsGrid: string[][] = sudoku.board_string_to_grid(
        puzzle.replaceAll('.', ' '),
    );

    const convert1DIndexTo2DIndex = useCallback(
        (index: NumericRange<0, 80>) => {
            const pairIndexNum = index + parseInt(String(index / 9));
            const isOneDigitNum = `${pairIndexNum}`.length === 1;
            const rowIndex = isOneDigitNum ? 0 : parseInt(`${pairIndexNum}`[0]);
            const columnIndex = isOneDigitNum
                ? pairIndexNum
                : parseInt(`${pairIndexNum}`[1]);

            return [rowIndex, columnIndex];
        },
        [],
    );

    const convert2DIndexTo1DIndex = useCallback(
        (rowIndex: number, columnIndex: number) => {
            return parseInt(`${rowIndex}${columnIndex}`) - rowIndex;
        },
        [],
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
        const wrongCells: { row: number; column: number }[] = [];

        puzzle.split('').forEach((value, index) => {
            const rightValue = solvedPuzzle[index];

            if (value !== rightValue && value !== '.') {
                const [rowIndex, columnIndex] = convert1DIndexTo2DIndex(
                    index as NumericRange<0, 8>,
                );
                wrongCells.push({ row: rowIndex, column: columnIndex });
            }
        });

        return wrongCells;
    };

    return {
        puzzle: puzzleAsGrid,
        changeCell,
        checkGame,
    };
};
