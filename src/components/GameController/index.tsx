import React from 'react';
import {
    controllerCellStyle,
    controllerRowStyle,
    controllerTableStyle,
    gameControllerStyle,
} from './style';
import eraserIcon from '../../assets/images/eraserIcon.png';
import './style.css';

export const GameController = () => {
    const keyboardNumbers = [...Array(9).keys()].map((number, index) => ({
        value: number + 1,
        id: index,
    }));

    return (
        <div id="game-controller" style={gameControllerStyle}>
            <table id="controller-table" style={controllerTableStyle}>
                <tbody>
                    <tr id="controller-row" style={controllerRowStyle}>
                        {keyboardNumbers.map((btnNum) => (
                            <td
                                className="controller-cell"
                                onClick={() => {
                                    console.log('fillEraseElements');
                                    // this.fillEraseElements(
                                    //     btnNum.id + 1,
                                    //     selectedCell,
                                    // );
                                }}
                                key={'' + btnNum.id}
                                style={controllerCellStyle}
                            >
                                {btnNum.value}
                            </td>
                        ))}
                        <td
                            className="controller-cell"
                            onClick={() => {
                                console.log('fillEraseElements');
                                // this.fillEraseElements('erase', selectedCell);
                            }}
                            id="erase-btn"
                            style={controllerCellStyle}
                        >
                            <img
                                src={eraserIcon}
                                alt="eraserIcon"
                                style={{ width: '30px' }}
                            />
                        </td>
                        <td
                            className="controller-cell"
                            onClick={() => {
                                console.log('undoEntries');
                                // this.undoEntries()
                            }}
                            id="undo-btn"
                            style={controllerCellStyle}
                        >
                            <svg
                                className="arrow-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 27 27"
                                style={{ width: '30px' }}
                            >
                                <path d="M13.021 0C9.207 0 5.589 1.715 3.125 4.609V.521a.521.521 0 0 0-1.042 0v5.208c0 .288.234.521.521.521h5.208a.522.522 0 1 0 0-1.042H3.977c2.267-2.619 5.566-4.166 9.044-4.166C19.625 1.042 25 6.416 25 13.021 25 19.626 19.625 25 13.021 25 6.416 25 1.042 19.626 1.042 13.021a.521.521 0 0 0-1.042 0c0 7.18 5.84 13.021 13.021 13.021 7.18 0 13.021-5.841 13.021-13.021C26.042 5.841 20.201 0 13.021 0"></path>
                            </svg>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
