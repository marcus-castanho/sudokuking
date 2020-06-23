import React, { Component } from "react";
import "./style.css"

export default class Main extends Component {
    state = {
        gameTable: [],
    };

    componentDidMount() {
        this.generateRamdomGame();
    }

    generateRamdomGame = async () => {
        var matrix = [];
        var i = 0;
        var j = 0;

        for (i = 0; i < 9; i++) {
            matrix[i] = [];
            for (j = 0; j < 9; j++) {
                var possibilities = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                const rowpossibilities = possibilities.filter(cell => (!matrix[i].includes(cell)));

                var t = i;
                var columnpossibilities = [];
                while (t >= 0) {
                    columnpossibilities.push(matrix[t][j]);
                    t -= 1;
                }

                columnpossibilities = possibilities.filter(cell => (!columnpossibilities.includes(cell)));

                console.log(columnpossibilities);
                console.log(rowpossibilities);

                possibilities = rowpossibilities.filter(x => columnpossibilities.includes(x));

                console.log(possibilities);

                matrix[i][j] = possibilities[Math.floor(Math.random() * possibilities.length)];

                console.log(matrix[i][j]);
            }
        }

        /*if (this.checkGame(matrix) == true) {
            console.clear();
            this.generateRamdomGame();
        }*/


        await this.setState({ gameTable: matrix });

    };

    checkGame = (matrix) => {
        var i = 0;
        var j = 0;
        var res = false;

        for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                if (matrix[i][j] = undefined) {
                    res = true;
                    break;
                }
            }
        }
        if (res = true) {
            return true;
        }
        else {
            return false;
        }
    };

    renderTable = () => {
        const { gameTable } = this.state;
        //const a = [1,2,3];

        //console.log(a.indexOf());


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