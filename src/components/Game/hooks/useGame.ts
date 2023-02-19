import { useState } from 'react';
import sudoku from 'sudoku-umd';

export type GameHook = (difficulty?: 'easy' | 'medium' | 'hard') => {
    puzzle: string[][];
    changeCell: (value: string, row: number, column: number) => void;
    checkGame: () => {
        row: number;
        column: number;
    }[];
};

export const useGame: GameHook = (difficulty = 'easy') => {
    const [puzzle, setPuzzle] = useState<string[][]>(
        sudoku.board_string_to_grid(sudoku.generate(difficulty)),
    );
    const [solvedPuzzle, setSolvedPuzzle] = useState<string[][]>(
        sudoku.solve(sudoku.board_grid_to_string(puzzle)),
    );

    const changeCell = (value: string, row: number, column: number) => {
        const newPuzzleState = puzzle.map((puzzleRow) =>
            puzzleRow.map((puzzleColumn) => puzzleColumn),
        );
        newPuzzleState[row][column] = value;
        setPuzzle(newPuzzleState);

        const newSolvedPuzzle = sudoku.solve(
            sudoku.board_grid_to_string(newPuzzleState),
        );

        if (newSolvedPuzzle) {
            setSolvedPuzzle(
                sudoku.board_string_to_grid(
                    sudoku.solve(sudoku.board_grid_to_string(newSolvedPuzzle)),
                ),
            );
        }
    };

    const checkGame = () => {
        const wrongCells: { row: number; column: number }[] = [];

        puzzle.forEach((row, rowIndex) =>
            row.forEach((column, columnIndex) => {
                const rightValue = solvedPuzzle[rowIndex][columnIndex];
                if (rightValue !== column && column !== '.') {
                    wrongCells.push({ row: rowIndex, column: columnIndex });
                }
            }),
        );

        return wrongCells;
    };

    return { puzzle, changeCell, checkGame };
};
