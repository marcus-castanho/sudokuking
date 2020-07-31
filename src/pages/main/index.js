import React, { Component } from "react";
import "./style.css";
import { makepuzzle, solvepuzzle } from "sudoku";
import { SudokuSolver } from 'sudoku-solver-js';
import playBtn from '../../images/playBtn.svg'
//import { Timers } from "./service/Timer"

export default class Main extends Component {
    container = React.createRef();
    state = {
        gameTable: [],
        currentDifficulty: '',
        timeData: { time: 0, isOn: false, start: 0 },
        counter: 0,
        selectedCell: null,
        difficultiesOpen: false,
    };

    entries = [];

    componentDidMount() {
        this.generateRamdomGame('easy');
        this.startTimer = this.startTimer.bind(this);
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    initialConfig = async () => {
        var btnIcon = document.getElementById('start-stop-btn');
        var gameTableRendered = document.getElementById('game-table');
        var gameTableHidden = document.getElementById('game-table-hidden');
        var playBtn = document.getElementById('play-btn');
        var checkBtn = document.getElementById('check-btn');
        var endgame = document.getElementById('endgame');

        await this.setState({
            gameTable: [],
            currentDifficulty: '',
            timeData: { time: 0, isOn: false, start: 0 },
            counter: 0,
            selectedCell: null,
            entries: [],
        })
        this.entries = [];
        this.puzzle = [];
        this.solution = [];

        gameTableRendered.style.filter = 'none';
        gameTableHidden.style.display = 'none'
        playBtn.style.display = 'none';
        checkBtn.disabled = false;
        endgame.style.display = 'none';
        btnIcon.disabled = false;

        return
    }

    startStopTimer = () => {
        var btnIcon = document.getElementById('start-stop-btn');
        var gameTableRendered = document.getElementById('game-table');
        var gameTableHidden = document.getElementById('game-table-hidden');
        var playBtn = document.getElementById('play-btn');
        var checkBtn = document.getElementById('check-btn');


        switch (btnIcon.innerText) {
            case 'stop': this.stopTimer();
                gameTableRendered.style.filter = 'blur(0.2rem)';
                gameTableHidden.style.display = 'block';
                playBtn.style.display = 'block';
                checkBtn.disabled = true;
                break;
            case 'start': this.startTimer();
                gameTableRendered.style.filter = 'none';
                gameTableHidden.style.display = 'none'
                playBtn.style.display = 'none';
                checkBtn.disabled = false;
                break;
            default:
                break;
        }
    };

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
        var puzzle = [...this.puzzle];
        var renderedCells = [];

        await this.setState({
            timeData: {
                time: this.state.timeData.time,
                isOn: false
            },
            selectedCell: null
        });
        clearInterval(this.timer);
        var btnIcon = document.getElementById("start-stop-btn");
        btnIcon.innerText = 'start'

        for (var element of puzzle) {
            renderedCells.push(document.getElementById('' + element.id));
            renderedCells[element.id].style.backgroundColor = '#fff';
            renderedCells[element.id].style = ':hover{ background-color: #00ff00 }';
        }
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

        var puzzle = [];
        var tinit = [];
        var solution = [];
        var tend = '';
        var tdiff = 100;
        var solver = new SudokuSolver();
        var game = '';

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

        this.puzzle = puzzle.map((cell, index) => {
            if (cell !== null) {
                return ({ value: cell + 1, id: index })
            }
            return { value: cell, id: index }
        });

        this.solution = this.puzzle.map(cell => {
            if (cell.value !== null) {
                return cell.value;
            }
            else { return 0 }
        });

        for (var element of this.solution) {
            game = game.concat('' + element);
        }

        this.solution = solver.solve(game, { result: 'array' });

        console.log(this.solution);

        puzzle = puzzle.map((cell, index) => {
            if (cell !== null) {
                return ({ value: cell + 1, id: index })
            }
            return { value: cell, id: index }
        });

        var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
        var n = 9;

        matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

        await this.setState({ gameTable: matrix, currentDifficulty: difficulty, difficultiesOpen: false });
    };

    listenPlayTurn = async (pos) => {

        var puzzle = [...this.puzzle];
        var renderedCells = [];
        var selectedCell = document.getElementById("" + pos);

        if (selectedCell.style.backgroundColor === 'red') {
            selectedCell.style.backgroundColor = '#fff';
            selectedCell.style = ':hover{ background-color: #00ff00 }';
            await this.setState({ selectedCell: null })
        }
        else {
            for (var element of puzzle) {
                renderedCells.push(document.getElementById('' + element.id));
                renderedCells[element.id].style.backgroundColor = '#fff';
                renderedCells[element.id].style = ':hover{ background-color: #00ff00 }';
            }

            selectedCell.style.backgroundColor = 'red';
            await this.setState({ selectedCell: pos })
        }
    }

    undoEntries = async () => {
        if (this.entries.length === 0) {
            return
        }
        else {
            var posDelete = this.entries[this.entries.length - 1].pos;
            var puzzle = [...this.puzzle];
            var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
            var n = 9;

            this.entries.pop();
            this.puzzle[posDelete].value = null;

            matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

            await this.setState({ gameTable: matrix });
        }
    };

    fillElements = async (entry, pos) => {

        if (pos === null) {
            return;
        }
        else {
            var renderedCells = [];
            var puzzle = [...this.puzzle];
            var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
            var n = 9;

            if (this.puzzle[pos].value === this.solution[pos]) {
                return;
            }

            this.entries.push({ value: entry, pos: pos });

            this.puzzle[pos].value = entry;

            puzzle[pos].value = entry;

            matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

            for (var element of this.puzzle) {
                renderedCells.push(document.getElementById('' + element.id));
                renderedCells[element.id].style.backgroundColor = '#fff';
                renderedCells[element.id].style = ':hover{ background-color: #00ff00 }';
            }

            await this.setState({ gameTable: matrix, selectedCell: null });

            this.listenGameEnd();
        }
    };


    checkEntries = () => {

        for (var element of this.puzzle) {
            if (element.value == null) {
                continue
            }
            else if (element.value !== this.solution[element.id]) {
                var wrongElements = document.getElementById('' + element.id);

                wrongElements.style.animation = 'check 1s';

            }
            else {
                continue
            }
        }

        setTimeout(() => {
            for (var element of this.puzzle) {
                if (element.value == null) {
                    continue
                }
                else if (element.value !== this.solution[element.id]) {
                    var wrongElements = document.getElementById('' + element.id);

                    wrongElements.style.removeProperty('animation');

                }
                else {
                    continue
                }
            }

        }, 1000);
    };

    newgame = async (difficulty) => {
        this.stopTimer();
        await setTimeout(this.resetTimer(), 1000);
        await this.initialConfig();
        this.generateRamdomGame(difficulty);
    };

    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
            this.setState({
                difficultiesOpen: false,
            });
        }
    };

    handleButtonClick = () => {
        this.setState(state => {
            return {
                difficultiesOpen: !state.difficultiesOpen,
            };
        });
    };

    listenGameEnd = () => {//IMPLEMENTAR PÁGINA DE FINAL DE JOGO
        var puzzle = [...this.puzzle];

        for (var element of puzzle) {
            puzzle[element.id] = element.value;
        }

        if (puzzle.toString() === this.solution.toString()) {
            var btnIcon = document.getElementById("start-stop-btn");
            var endgame = document.getElementById("endgame");

            btnIcon.disabled = 'true';
            endgame.style.display = "block";

            this.stopTimer();
            console.log('CONGRATS');
        }
    }

    renderTable = () => {
        const { gameTable } = this.state;

        return (
            <tbody>
                {gameTable.map(row => (
                    <tr className="game-row" key={gameTable.indexOf(row)}>
                        {row.map(cell => (
                            <td className="game-cell" id={cell.id} onClick={() => this.listenPlayTurn(cell.id)} key={cell.id}>{cell.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    };

    renderController = () => {
        const { selectedCell } = this.state;

        var number = [...Array(9).keys()];
        number = number.map(num => ({ value: num + 1, id: number.indexOf(num) }));

        return (<tbody>
            <tr id='controller-row'>{number.map(btnNum => (<td className='controller-cell' onClick={() => this.fillElements(btnNum.id + 1, selectedCell)} key={"" + btnNum.id}>{btnNum.value}</td>))}
                <td className='controller-cell' onClick={() => this.undoEntries()} id='delete-btn'>Undo</td>
            </tr>
        </tbody>
        )
    };


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
                                <button id='check-btn' onClick={() => this.checkEntries()}>check</button>
                            </div>
                        </div>
                        <div id='selec-newgame'>
                            <button id='btn-newgame' onClick={() => this.handleButtonClick()}>New Game x</button>{this.state.difficultiesOpen && (<div id='selec-newgame-dropdown' ref={this.container}>
                                <ul>
                                    <li className='selec-newgame-item'><button className='selec-difficulty-btn' onClick={() => { this.newgame('easy') }}>Easy</button></li>
                                    <li className='selec-newgame-item'><button className='selec-difficulty-btn' onClick={() => { this.newgame('medium') }}>Medium</button></li>
                                    <li className='selec-newgame-item'><button className='selec-difficulty-btn' onClick={() => { this.newgame('hard') }}>Hard</button></li>
                                </ul>
                            </div>)}
                        </div>
                    </div>
                    <div id='game-display'>
                        <div id='game-board'>
                            <div id='game-table-container'>
                                <div id='endgame'>
                                    <div id='congrats-newgame'>
                                        <p>Congratulations!</p>
                                        <p>{this.msTime(this.state.timeData.time)}</p>
                                        <button onClick={() => { this.newgame('easy') }}>START NEW GAME</button>
                                    </div>
                                </div>
                                <div id='game-table-hidden'>
                                </div>
                                <div id='play-btn' onClick={() => this.startStopTimer()}><img src={playBtn} alt='playBtn' /></div>
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