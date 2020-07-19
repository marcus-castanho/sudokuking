import React, { Component } from "react";
import "./style.css";
import { makepuzzle, solvepuzzle } from "sudoku";
import { SudokuSolver } from 'sudoku-solver-js';
//import { Timers } from "./service/Timer"

export default class Main extends Component {
    state = {
        gameTable: [],
        currentDifficulty: '',
        timeData: { time: 0, isOn: false, start: 0 },
        counter: 0,
    };

    puzzle = [];


    componentDidMount() {
        this.generateRamdomGame('easy');
        this.startTimer = this.startTimer.bind(this)

    }

    startTimer = async () => {
        var startInstant = Date.now() - this.state.timeData.time;

        await this.setState({
            timeData: {
                isOn: true,
                time: this.state.timeData.time,
                start: startInstant,
            }
        })
        this.timer = await setInterval(() => this.setState({
            timeData: {
                time: Date.now() - this.state.timeData.start,
                start: startInstant
            }
        }), 1);
        var btnIcon = document.getElementById("start-stop-btn");
        btnIcon.innerText = 'stop'
    };

    stopTimer = async () => {
        await this.setState({
            timeData: {
                time: this.state.timeData.time,
                isOn: false
            }
        });
        clearInterval(this.timer);
        var btnIcon = document.getElementById("start-stop-btn");
        btnIcon.innerText = 'start'
    };

    resetTimer = async () => {
        this.stopTimer();
        await this.setState({ timeData: { time: 0, isOn: false } })
    };

    msTime = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;
        mins = ("00" + mins).substr(-2);
        secs = ("00" + secs).substr(-2);
        hrs = ("00" + hrs).substr(-2);
        return hrs + ':' + mins + ':' + secs;
    };

    generateRamdomGame = async (difficulty) => {
        this.startTimer();

        //var solver = new SudokuSolver; >> solver.solve(string 00250..)
        var selecNewgameDropdown = document.getElementById('selec-newgame-dropdown');
        var puzzle = [];
        var tinit = [];
        var solution = [];
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

        console.log(puzzle);

        /*puzzle = puzzle.map(cell => {
            if (cell !== null) {
                return cell + 1;
            }
            else { return 0 }
        })

        var game = '';
        for (var element of puzzle) {
            game = game.concat('' + element)
        }

        solution = solver.solve(game, { result: 'array' })*/

        this.puzzle = puzzle.map((cell, index) => {
            if (cell !== null) {
                return ({ value: cell + 1, id: index })
            }
            return { value: cell, id: index }
        });

        puzzle = puzzle.map((cell, index) => {
            if (cell !== null) {
                return ({ value: cell + 1, id: index })
            }
            return { value: cell, id: index }
        });

        var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
        var n = 9;

        matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

        await this.setState({ gameTable: matrix, currentDifficulty: difficulty });

        selecNewgameDropdown.style.display = 'none';


    };

    checkEntries = (entry, matrix) => {

        return null
    }

    fillElements = () => {

        var entry = 2;
        var pos = 10;
        var puzzle = this.puzzle;

        var solver = new SudokuSolver();
        var game = '';
        var solution = [];
        var n = 9;

        puzzle[pos].value = entry;
        console.log(puzzle);

        puzzle = puzzle.map(cell => {
            if (cell.value !== null) {
                return cell.value;
            }
            else { return 0 }
        })

        var game = '';
        for (var element of puzzle) {
            game = game.concat('' + element)
        }

        solution = solver.solve(game, { result: 'array' });

        console.log(solution);

        if (solution === 'No solution found.') {
            var elementHint = document.getElementById('80');

            elementHint.style.backgroundColor = "ff0"

        }

        /*newgameTable = newgameTable[8]

        console.log(newgameTable);

        matrix = new Array(Math.ceil(newgameTable.length / n)).fill().map(_ => newgameTable.splice(0, n));* /

        await this.setState({ gameTable: []);*/

    }

    newgame = async (difficulty) => {
        this.stopTimer();
        await setTimeout(this.resetTimer(), 1000);
        this.generateRamdomGame(difficulty);
    };

    startStopTimer = () => {
        var btnIcon = document.getElementById('start-stop-btn');

        switch (btnIcon.innerText) {
            case 'stop': this.stopTimer();
                break;
            case 'start': this.startTimer();
                break;
            default:
                break;
        }
    };

    renderTable = () => {
        const { gameTable } = this.state;

        return (
            <tbody>
                {gameTable.map(row => (
                    <tr className="game-row" key={gameTable.indexOf(row)}>
                        {row.map(cell => (
                            <td className="game-cell" id={cell.id} key={cell.id} style={{ backgroundColor: "#fff" }}>{cell.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    renderController = () => {
        var number = [...Array(9).keys()];
        number = number.map(num => ({ value: num + 1, id: number.indexOf(num) }));

        return (<tbody>
            <tr id='controller-row'>{number.map(btnNum => (<td className='controller-cell' key={"" + btnNum.id}>{btnNum.value}</td>))}
            </tr>
        </tbody>
        )
    }

    renderDifficulties = () => {
        var selecNewgameDropdown = document.getElementById('selec-newgame-dropdown');

        if (selecNewgameDropdown.style.display === 'none') {
            selecNewgameDropdown.style.display = 'block';
        }
        else if (selecNewgameDropdown.style.display === 'block') {
            selecNewgameDropdown.style.display = 'none';
        }
    }


    render() {
        return (
            <div className='game'>
                <div id='game-page'>
                    <div id='game-header'>
                        <div id='game-info'>
                            <p id='difficulty'>{this.state.currentDifficulty}</p>
                            <div id='timer'>
                                <p>{this.msTime(this.state.timeData.time)}</p>
                                <button id='start-stop-btn' onClick={() => this.startStopTimer()}></button>
                                <button onClick={() => this.fillElements()}>fill/check</button>
                            </div>
                        </div>
                        <div id='selec-newgame'>
                            <button id='btn-newgame' onClick={() => { this.renderDifficulties() }}>New Game x</button>
                            <div id='selec-newgame-dropdown' style={{ display: 'none' }}>
                                <ul>
                                    <li className='selec-newgame-item'><button className='selec-difficulty-btn' onClick={() => { this.newgame('easy') }}>Easy</button></li>
                                    <li className='selec-newgame-item'><button className='selec-difficulty-btn' onClick={() => { this.newgame('medium') }}>Medium</button></li>
                                    <li className='selec-newgame-item'><button className='selec-difficulty-btn' onClick={() => { this.newgame('hard') }}>Hard</button></li>
                                </ul>
                            </div>
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
                            <table id='controller-table'>{this.renderController()}
                            </table>
                        </div>
                    </div>
                    <div id='adsense'></div>
                </div>
            </div>
        )
    }
}