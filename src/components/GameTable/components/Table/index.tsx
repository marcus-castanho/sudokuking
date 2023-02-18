import React, { FC, useState } from 'react';
import {
    gameCellStyle,
    gameRowStyle,
    gameTableBodyStyle,
    gameTableStyle,
} from './style';
import './style.css';

export const Table: FC = () => {
    const [gameTable, setGameTable] = useState(() =>
        Array(9)
            .fill(0)
            .map(() => Array(9).fill(0)),
    );

    return (
        <table id="game-table" style={gameTableStyle}>
            <tbody style={gameTableBodyStyle}>
                {gameTable.map((row, rowIndex) => (
                    <tr
                        className="game-row"
                        key={gameTable.indexOf(row)}
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
