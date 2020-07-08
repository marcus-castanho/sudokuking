import React, { Component } from "react";
import "./style.css";
import { makepuzzle, solvepuzzle } from "sudoku";
import { Timer } from "easytimer.js";
import { ms } from "pretty-ms"

export default class Main extends Component {
    state = {
        gameTable: [],
        currentDifficulty: '',
        timeData: { time: 0, isOn: false, start: 0 },
    };


    componentDidMount() {
        this.generateRamdomGame('easy');
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);

    }

    startTimer = () => {
        this.setState({
            timeData: {
                time: this.state.time,
                isOn: true,
                start: Date.now() - this.state.timeData.time
            }
        })
        this.timer = setInterval(() => this.setState({
            timeData: {
                time: Date.now() - this.state.timeData.start
            }
        }), 1);

        setTimeout(console.log(this.state.timeData.time), 10000);
    };

    stopTimer = () => {
        this.setState({ timeData: { isOn: false } })
        clearInterval(this.timeData.time)
    };

    resetTimer = () => {
        this.setState({ timeData: { time: 0, isOn: false } })
    }


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
        let start = (this.state.timeData.time === 0) ?
            <button onClick={this.startTimer}>start</button> :
            null
        /*let stop = (this.state.timeData.time === 0 || !this.state.timeData.isOn) ?
            null :
            <button onClick={this.stopTimer}>stop</button>
        let resume = (this.state.timeData.time === 0 || this.state.timeData.isOn) ?
            null :
            <button onClick={this.startTimer}>resume</button>
        let reset = (this.state.timeData.time === 0 || this.state.timeData.isOn) ?
            null :
            <button onClick={this.resetTimer}>reset</button>*/



        return (
            <div className='game'>
                <div id='game-page'>
                    <div id='game-header'>
                        <div id='game-info'>
                            <p id='difficulty'>{this.state.currentDifficulty}</p>
                            <div id='timer'>
                                <p>{this.state.timeData.time}</p>
                                <button id="play-pause-btn">o-</button>
                            </div>
                        </div>
                        <div id='selec-newgame'>
                            <button id='btn-newgame' onClick={() => { this.generateRamdomGame('easy'); this.startTimer() }}>New Game</button>
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