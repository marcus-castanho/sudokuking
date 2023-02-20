import React, { FC, useEffect, useState } from 'react';
import { NumericRange, SelectedCell } from '../../../../@types';
import { GameHook } from '../../../Game/hooks';
import {
    gameCellStyle,
    gameRowStyle,
    gameTableBodyStyle,
    gameTableStyle,
} from './style';
import './style.css';

export type TableProps = {
    puzzle: ReturnType<GameHook>['puzzle'];
    handleSelectCell: ({ rowIndex, columnIndex }: SelectedCell) => void;
    wrongCells: ReturnType<GameHook>['wrongCells'];
};

export const Table: FC<TableProps> = ({
    puzzle,
    handleSelectCell,
    wrongCells,
}) => {
    const [markWrongCells, setMarkWrongCells] = useState(false);

    const markCell = (rowIndex: number, columnIndex: number) => {
        return (
            markWrongCells &&
            wrongCells.some((coordinates) => {
                return (
                    coordinates.rowIndex === rowIndex &&
                    coordinates.columnIndex === columnIndex
                );
            })
        );
    };

    useEffect(() => {
        setMarkWrongCells(true);
    }, [wrongCells]);

    return (
        <table id="game-table" style={gameTableStyle}>
            <tbody style={gameTableBodyStyle}>
                {puzzle.map((row, rIndex) => (
                    <tr className="game-row" key={rIndex} style={gameRowStyle}>
                        {row.map((cell, cIndex) => {
                            const rowIndex = rIndex as NumericRange<0, 8>;
                            const columnIndex = cIndex as NumericRange<0, 8>;
                            const isWrongCell = markCell(rowIndex, columnIndex);

                            return (
                                <td
                                    className={`game-cell ${'row' + rIndex} ${
                                        'col' + cIndex
                                    } ${isWrongCell ? 'wrongCell' : ''}`}
                                    onClick={() => {
                                        handleSelectCell({
                                            rowIndex,
                                            columnIndex,
                                        });
                                    }}
                                    key={`${'row' + rIndex}-${'col' + cIndex}`}
                                    style={gameCellStyle}
                                    onAnimationEnd={() =>
                                        setMarkWrongCells(false)
                                    }
                                >
                                    {cell}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
