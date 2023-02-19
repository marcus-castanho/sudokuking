import React, { FC, useState } from 'react';
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
};

export const Table: FC<TableProps> = ({ puzzle }) => {
    return (
        <table id="game-table" style={gameTableStyle}>
            <tbody style={gameTableBodyStyle}>
                {puzzle.map((row, rowIndex) => (
                    <tr
                        className="game-row"
                        key={rowIndex}
                        style={gameRowStyle}
                    >
                        {row.map((cell, columnIndex) => (
                            <td
                                className={`game-cell ${'row' + rowIndex} ${
                                    'col' + columnIndex
                                }`}
                                // id={cell.id}
                                onClick={() => {
                                    console.log('listenPlayTurn');
                                    // this.listenPlayTurn(cell.id)
                                }}
                                key={`${'row' + rowIndex}-${
                                    'col' + columnIndex
                                }`}
                                style={gameCellStyle}
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
