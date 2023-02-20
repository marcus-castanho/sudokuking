import React, { FC } from 'react';
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
    return (
        <table id="game-table" style={gameTableStyle}>
            <tbody style={gameTableBodyStyle}>
                {puzzle.map((row, rIndex) => (
                    <tr className="game-row" key={rIndex} style={gameRowStyle}>
                        {row.map((cell, cIndex) => {
                            const rowIndex = rIndex as NumericRange<0, 8>;
                            const columnIndex = cIndex as NumericRange<0, 8>;

                            const style = wrongCells.some((coordinates) => {
                                return (
                                    coordinates.rowIndex === rowIndex &&
                                    coordinates.columnIndex === columnIndex
                                );
                            })
                                ? { ...gameCellStyle, color: 'red' }
                                : gameCellStyle;

                            return (
                                <td
                                    className={`game-cell ${'row' + rIndex} ${
                                        'col' + cIndex
                                    }`}
                                    onClick={() => {
                                        handleSelectCell({
                                            rowIndex,
                                            columnIndex,
                                        });
                                    }}
                                    key={`${'row' + rIndex}-${'col' + cIndex}`}
                                    style={style}
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
