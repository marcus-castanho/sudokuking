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
    selectCell: ({ rowIndex, columnIndex }: SelectedCell) => void;
    wrongCells: ReturnType<GameHook>['wrongCells'];
};

export const Table: FC<TableProps> = ({ puzzle, selectCell, wrongCells }) => {
    const [markWrongCells, setMarkWrongCells] = useState(false);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);

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

    const handleSelectedCell = ({
        rowIndex,
        columnIndex,
    }: {
        rowIndex: NumericRange<0, 8>;
        columnIndex: NumericRange<0, 8>;
    }) => {
        selectCell({
            rowIndex,
            columnIndex,
        });
        setSelectedCell((state) => {
            const isSelectedCell =
                state?.rowIndex === rowIndex &&
                state.columnIndex === columnIndex;
            return isSelectedCell
                ? null
                : {
                      rowIndex,
                      columnIndex,
                  };
        });
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
                            const isSelectedCell =
                                selectedCell?.rowIndex === rowIndex &&
                                selectedCell.columnIndex === columnIndex;
                            const style = isSelectedCell
                                ? {
                                      ...gameCellStyle,
                                      color: '#fff',
                                      backgroundColor: 'rgba(110,110,110,0.2)',
                                  }
                                : gameCellStyle;

                            return (
                                <td
                                    className={`game-cell ${'row' + rIndex} ${
                                        'col' + cIndex
                                    } ${isWrongCell ? 'wrongCell' : ''}`}
                                    onClick={() =>
                                        handleSelectedCell({
                                            rowIndex,
                                            columnIndex,
                                        })
                                    }
                                    key={`${'row' + rIndex}-${'col' + cIndex}`}
                                    style={style}
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
