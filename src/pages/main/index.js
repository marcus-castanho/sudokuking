import React, { Component } from "react";
import "./style.css"

export default class Main extends Component {
    state = {
        gameTable: [],
        redoLimit: "",
    };

    componentDidMount() {
        this.generateRamdomGame();
    }

    generateRamdomGame = /*async*/ () => {
        var arr = [...Array(9).keys()];
        var matrix = [Array(81).fill()];
        var i = 0;


        for (i = 0; i < 81; i++) {
            if (i % 9 == 0) {
                arr = arr.sort(() => Math.random() - 0.5)
            }
            var perBox = ((i / 3) % 3) * 9 + ((i % 27) / 9) * 3 + (i / 27) * 27 + (i % 3);
            matrix[perBox] = arr[i % 9];
        }

        console.log(matrix);

        //await this.setState({ gameTable: matrix });

    };

    renderTable = () => {
        const { gameTable } = this.state;

        return (
            <tbody>
                {gameTable.map(row => (
                    <tr className="game-row">
                        {row.map(cell => (
                            <td className="game-cell" id={gameTable.indexOf(row) + row.indexOf(cell)}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    render() {

        return (
            <div className='game'>
                <div id='game-page'>
                    <div id='game-header'>
                        <div id='game-info'>
                            <p>Difficulty</p>
                            <div id='timer'>
                                <p id='time'>10:00:00</p>
                                <button id="play-pause-btn">o-</button>
                            </div>
                        </div>
                        <div id='selec-newgame'>
                            <select>
                                <option value='new-game'>
                                    New Game
                            </option>
                            </select>
                        </div>
                    </div>
                    <div id='game-display'>
                        <div id='game-board'>
                            <div id='game-table-container'>
                                <table id='game-table'>
                                    {this.renderTable()}
                                </table>
                            </div>
                        </div>
                        <div id='game-controller'>
                            <table id='controller-table'>
                                <tbody>
                                    <tr id="controller-row">
                                        <td className="controller-cell">0</td>
                                        <td className="controller-cell">1</td>
                                        <td className="controller-cell">2</td>
                                        <td className="controller-cell">3</td>
                                        <td className="controller-cell">4</td>
                                        <td className="controller-cell">5</td>
                                        <td className="controller-cell">6</td>
                                        <td className="controller-cell">7</td>
                                        <td className="controller-cell">8</td>
                                        <td className="controller-cell">9</td>
                                        <td className="controller-cell">1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id='adsense'></div>
                </div>
            </div>
        )
    }
}