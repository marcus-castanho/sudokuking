import React, { Component } from "react";
import "./style.css";
import { makepuzzle, solvepuzzle } from "sudoku";
import { Timer } from "easytimer.js";

export default class Main extends Component {
    state = {
        gameTable: [],
        currentDifficulty: '',
        currentTime: [],
    };

    componentDidMount() {
        this.generateRamdomGame('easy');
        this.controlTimer('start');
    }

    controlTimer = async (action) => {
        var timer = new Timer();

        switch (action) {
            case 'start':
                timer.start();
                return await this.setState({
                    currentTime: timer.getTimeValues().toString()
                })
            case 'pause':

                break;
            case 'stop':

                break;
            case 'reset':

                break;
            default:
                break;
        }

    };

    renderTimer = () => {
        const { currentTime } = this.state;
        var timer = new Timer();

        return (
            <p id='time'>{timer.addEventListener('secondUpdated', currentTime)}</p>
        )
    };

    generateRamdomGame = async (difficulty) => {
        var puzzle = '';
        var tinit = '';
        var solution = '';
        var tend = '';
        var tdiff = 100;

        switch (difficulty) {
            case 'easy':
                while (tdiff >= 0.25) {
                    puzzle = new makepuzzle();

                    tinit = performance.now();

                    solution = new solvepuzzle(puzzle);

                    tend = performance.now();
                    tdiff = tend - tinit;
                }
                break;
            case 'medium':
                while (tdiff < 0.25 || tdiff >= 0.4) {
                    puzzle = new makepuzzle();

                    tinit = performance.now();

                    solution = new solvepuzzle(puzzle);

                    tend = performance.now();
                    tdiff = tend - tinit;
                }
                break;
            case 'hard':
                while (tdiff < 0.4 || tdiff >= 0.5) {
                    puzzle = new makepuzzle();

                    tinit = performance.now();

                    solution = new solvepuzzle(puzzle);

                    tend = performance.now();
                    tdiff = tend - tinit;
                }
                break;
            default:
                break;
        }

        console.log(tdiff);
        console.log(solution);

        puzzle = puzzle.map(cell => ({ value: cell, id: puzzle.indexOf(cell) }));

        var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
        var n = 9;

        matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

        await this.setState({ gameTable: matrix, currentDifficulty: difficulty });

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
                            <p id='difficulty'>{this.state.currentDifficulty}</p>
                            <div id='timer'>
                                {this.renderTimer()}
                                <button id="play-pause-btn">o-</button>
                            </div>
                        </div>
                        <div id='selec-newgame'>
                            <button id='btn-newgame' onClick={() => this.generateRamdomGame('easy')}>New Game</button>
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