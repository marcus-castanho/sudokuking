import React, { Component } from "react";
import "./style.css";
import { makepuzzle, solvepuzzle } from "sudoku";

export default class Main extends Component {
    state = {
        gameTable: [],
    };

    componentDidMount() {
        this.generateRamdomGame(0);
    }

    generateRamdomGame = async (difficulty) => {

        var tdiff = 0.26;

        switch (difficulty) {
            case 0:
                while (tdiff >= 0.25) {
                    var puzzle = makepuzzle();

                    var tinit = performance.now();

                    var solution = solvepuzzle(puzzle);

                    var tend = performance.now();
                    tdiff = tend - tinit;
                }
                break;
            case 1:
                while (tdiff < 0.25 || tdiff >= 0.4) {
                    var puzzle = makepuzzle();

                    var tinit = performance.now();

                    var solution = solvepuzzle(puzzle);

                    var tend = performance.now();
                    tdiff = tend - tinit;
                }
                break;
            case 2:
                while (tdiff < 0.4 || tdiff >= 0.5) {
                    var puzzle = makepuzzle();

                    var tinit = performance.now();

                    var solution = solvepuzzle(puzzle);

                    var tend = performance.now();
                    tdiff = tend - tinit;
                }
                break;
        }
        

        console.log(solution);

        puzzle = puzzle.map(cell => ({ value: cell, id: puzzle.indexOf(cell) }));

        var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
        var n = 9;

        matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

        await this.setState({ gameTable: matrix });

    };

    renderTable = () => {
        const { gameTable } = this.state;

        return (
            <tbody>
                {gameTable.map(row => (
                    <tr className="game-row" key={gameTable.indexOf(row)}>
                        {row.map(cell => (
                            <td className="game-cell" id={"" + gameTable.indexOf(row) + row.indexOf(cell)} key={"" + gameTable.indexOf(row) + row.indexOf(cell)}>{cell.value}</td>
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
                            <button id='btn-newgame' onClick={this.generateRamdomGame(0)}>New Game</button>
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