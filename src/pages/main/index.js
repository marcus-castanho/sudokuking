import React, { Component } from "react";
import "./style.css";
import { makepuzzle, solvepuzzle } from "sudoku";
import { SudokuSolver } from 'sudoku-solver-js';
import playBtn from '../../images/playBtn.png'
import playBtnTimer from '../../images/playBtnTimer.png'
import pauseBtnTimer from '../../images/pauseBtnTimer.png'
import eraserIcon from '../../images/eraserIcon.png'
import sudokuChecked from '../../images/sudokuChecked.PNG'
import sudokuMagazineBw from '../../images/sudoku-magazine-bw.png'
import sudokuPossibilities from '../../images/sudokuPossibilities.PNG'

export default class Main extends Component {
    container = React.createRef();
    state = {
        gameTable: [],
        timeData: { time: 0, isOn: false, start: 0 },
        counter: 0,
        selectedCell: null,
        newgameOpen: false,
    };

    entries = [];

    componentDidMount() {
        this.generateRamdomGame('easy');
        this.startTimer = this.startTimer.bind(this);
    }

    initialConfig = async () => {
        var btnIcon = document.getElementById('start-stop-btn');
        var gameTableRendered = document.getElementById('game-table');
        var gameTableHidden = document.getElementById('game-table-hidden');
        var playBtn = document.getElementById('play-btn');
        var checkBtn = document.getElementById('check-btn');
        var endgame = document.getElementById('endgame');
        var btnNewgame = document.getElementById('btn-newgame');

        await this.setState({
            gameTable: [],
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
        btnIcon.style = 'pointer-events:';
        btnNewgame.disabled = false;

        return
    }

    startStopTimer = () => {
        var btnIcon = document.getElementById('start-stop-btn');
        var gameTableRendered = document.getElementById('game-table');
        var gameTableHidden = document.getElementById('game-table-hidden');
        var playBtn = document.getElementById('play-btn');
        var checkBtn = document.getElementById('check-btn');
        var btnNewgame = document.getElementById('btn-newgame');

        switch (btnIcon.className) {
            case 'stop': this.stopTimer();
                gameTableRendered.style.filter = 'blur(0.2rem)';
                gameTableHidden.style.display = 'block';
                playBtn.style.display = 'block';
                checkBtn.disabled = true;
                btnNewgame.disabled = true;
                break;
            case 'start': this.startTimer();
                gameTableRendered.style.filter = 'none';
                gameTableHidden.style.display = 'none'
                playBtn.style.display = 'none';
                checkBtn.disabled = false;
                btnNewgame.disabled = false;
                break;
            default:
                break;
        }
    };

    startTimer = async () => {
        var startInstant = Date.now() - this.state.timeData.time;
        var pausetImg = document.createElement('img');
        pausetImg.setAttribute("src", pauseBtnTimer);
        pausetImg.setAttribute("id", "pauseBtnTimer");

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
        btnIcon.className = 'stop';
        btnIcon.innerHTML = '';
        btnIcon.appendChild(pausetImg);
    };

    stopTimer = async () => {
        var startImg = document.createElement('img');
        startImg.setAttribute("src", playBtnTimer);
        startImg.setAttribute("id", "playBtnTimer");

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
        btnIcon.className = 'start';
        btnIcon.innerHTML = '';
        btnIcon.appendChild(startImg);

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

    generateRamdomGame = async () => {
        this.startTimer();

        var puzzle = [];
        var tinit = [];
        var tend = '';
        var tdiff = 100;
        var solver = new SudokuSolver();
        var game = '';
        this.givenNumsIndex = [];

        while (tdiff < 0.25 || tdiff >= 0.4) {
            puzzle = new makepuzzle();

            tinit = performance.now();

            solvepuzzle(puzzle);

            tend = performance.now();
            tdiff = tend - tinit;
        }

        this.puzzle = puzzle.map((cell, index) => {
            var endRowElmt = 8;
            var currRow = 0;
            var currCol = index % 9;
            var endSquareRowIndex = 2;
            var endSquareColIndex = 2;
            var squareRowIndex = 0;
            var squareColIndex = 0;


            while (index > endRowElmt) {
                endRowElmt += 9;
                currRow += 1;
            }

            while (currCol > endSquareColIndex) {
                endSquareColIndex += 3;
                squareColIndex += 1;
            }

            while (currRow > endSquareRowIndex) {
                endSquareRowIndex += 3;
                squareRowIndex += 1;
            }

            var currSquare = (3 * squareRowIndex) + squareColIndex;

            if (cell !== null) {
                this.givenNumsIndex.push(index);
                return ({ value: cell + 1, id: index, row: currRow, collum: currCol, square: currSquare })
            }
            return { value: cell, id: index, row: currRow, collum: currCol, square: currSquare }
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

        puzzle = [...this.puzzle];

        var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
        var n = 9;

        matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

        await this.setState({ gameTable: matrix, newgameOpen: false });
    };

    listenPlayTurn = async (pos) => {

        var puzzle = [...this.puzzle];
        var renderedCells = [];
        var selectedCell = document.getElementById("" + pos);

        if (this.state.selectedCell === pos) {
            for (var element of puzzle) {
                renderedCells.push(document.getElementById('' + element.id));
                renderedCells[element.id].style.backgroundColor = '#fff';
                renderedCells[element.id].style = ':hover{ background-color: #00ff00 }';
            }
            selectedCell.style.backgroundColor = '#fff';
            selectedCell.style = ':hover{ background-color: #00ff00 }';
            selectedCell.style.color = '#000'
            await this.setState({ selectedCell: null })
        }
        else {
            for (element of puzzle) {
                renderedCells.push(document.getElementById('' + element.id));
                renderedCells[element.id].style.backgroundColor = '#fff';
                renderedCells[element.id].style = ':hover{ background-color: #00ff00 }';
                if (element.row === puzzle[pos].row || element.collum === puzzle[pos].collum || element.square === puzzle[pos].square) {
                    renderedCells[element.id].style.backgroundColor = 'rgba(110,110,110,0.2)';
                }
            }

            selectedCell.style.color = '#fff'
            selectedCell.style.backgroundColor = 'rgb(110,110,110)';
            await this.setState({ selectedCell: pos })
        }
    }

    undoEntries = async () => {
        var btnIcon = document.getElementById('start-stop-btn');

        if (btnIcon.className === 'start') {
            return
        }

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

    fillEraseElements = async (entry, pos) => {
        var renderedCells = [];
        var puzzle = [...this.puzzle];
        var matrix = [Array(9).fill(0).map(() => Array(9).fill(0))];
        var n = 9;
        var element = '';
        var btnIcon = document.getElementById('start-stop-btn');

        if (btnIcon.className === 'start') {
            return
        }

        if (pos === null) {
            return;
        }
        else if (entry === 'erase') {
            if (this.puzzle[pos] === null) {
                return
            }
            else if (this.givenNumsIndex.includes(pos) === true) {
                return;
            }

            var cellErase = this.entries.find(element => element.pos === pos);
            var cellEraseIndex = this.entries.indexOf(cellErase);

            this.entries.splice(cellEraseIndex, 1);

            this.puzzle[pos].value = null;
            puzzle[pos].value = null;

            matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

            for (element of this.puzzle) {
                renderedCells.push(document.getElementById('' + element.id));
                renderedCells[element.id].style.backgroundColor = '#fff';
                renderedCells[element.id].style = ':hover{ background-color: #00ff00 }';
            }

            await this.setState({ gameTable: matrix, selectedCell: null });


        }
        else {

            if (this.puzzle[pos].value === this.solution[pos]) {
                return;
            }

            this.entries.push({ value: entry, pos: pos });

            this.puzzle[pos].value = entry;

            puzzle[pos].value = entry;

            matrix = new Array(Math.ceil(puzzle.length / n)).fill().map(_ => puzzle.splice(0, n));

            for (element of this.puzzle) {
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

    newgame = async () => {
        this.stopTimer();
        await this.resetTimer();
        await this.initialConfig();
        this.generateRamdomGame();
    };

    handleButtonClick = (newGameResumeGame) => {
        var btnIcon = document.getElementById('start-stop-btn');
        var gameTableRendered = document.getElementById('game-table');
        var gameTableHidden = document.getElementById('game-table-hidden');
        var playBtn = document.getElementById('play-btn');
        var checkBtn = document.getElementById('check-btn');

        if (newGameResumeGame === 'newgameOpt') {
            if (this.state.newgameOpen === false) {
                gameTableRendered.style.filter = 'blur(0.2rem)';
                gameTableHidden.style.display = 'block';
                playBtn.style.display = 'block';
                checkBtn.disabled = true;
                btnIcon.style = 'pointer-events: none'

                this.startStopTimer();

                this.setState(state => {
                    return {
                        newgameOpen: true,
                    };
                });
            }
            else {
                return
            }
        }
        if (newGameResumeGame === 'resumegameOpt') {
            gameTableRendered.style.filter = 'none';
            gameTableHidden.style.display = 'none'
            playBtn.style.display = 'none';
            checkBtn.disabled = false;
            btnIcon.style = 'pointer-events:';

            this.startStopTimer();

            this.setState(state => {
                return {
                    newgameOpen: false,
                };
            });
        }
    };

    listenGameEnd = () => {
        var puzzle = [...this.puzzle];

        for (var element of puzzle) {
            puzzle[element.id] = element.value;
        }

        if (puzzle.toString() === this.solution.toString()) {
            var btnIcon = document.getElementById("start-stop-btn");
            var endgame = document.getElementById("endgame");
            var btnNewgame = document.getElementById('btn-newgame');
            var checkBtn = document.getElementById('check-btn');


            btnIcon.style = 'pointer-events: none';
            btnNewgame.disabled = true;
            checkBtn.disabled = true;
            endgame.style.display = "block";

            this.stopTimer();
        }
    }


    renderTable = () => {
        const { gameTable } = this.state;

        return (
            <tbody>
                {gameTable.map(row => (
                    <tr className="game-row" key={gameTable.indexOf(row)}>
                        {row.map(cell => (
                            <td className={`game-cell ${'row' + cell.row} ${'col' + cell.collum}`} id={cell.id} onClick={() => this.listenPlayTurn(cell.id)} key={cell.id}>{cell.value}</td>
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
            <tr id='controller-row'>{number.map(btnNum => (<td className='controller-cell' onClick={() => this.fillEraseElements(btnNum.id + 1, selectedCell)} key={"" + btnNum.id}>{btnNum.value}</td>))}
                <td className='controller-cell' onClick={() => this.fillEraseElements('erase', selectedCell)} id='erase-btn'><img src={eraserIcon} alt='eraserIcon' /></td>
                <td className='controller-cell' onClick={() => this.undoEntries()} id='undo-btn'><svg className='arrow-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27"><path d="M13.021 0C9.207 0 5.589 1.715 3.125 4.609V.521a.521.521 0 0 0-1.042 0v5.208c0 .288.234.521.521.521h5.208a.522.522 0 1 0 0-1.042H3.977c2.267-2.619 5.566-4.166 9.044-4.166C19.625 1.042 25 6.416 25 13.021 25 19.626 19.625 25 13.021 25 6.416 25 1.042 19.626 1.042 13.021a.521.521 0 0 0-1.042 0c0 7.18 5.84 13.021 13.021 13.021 7.18 0 13.021-5.841 13.021-13.021C26.042 5.841 20.201 0 13.021 0"></path></svg></td>
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
                            <div id='timer'>
                                <p>{this.msTime(this.state.timeData.time)}</p>
                                <button id='start-stop-btn' className='stop' onClick={() => this.startStopTimer()}></button>
                            </div>
                        </div>
                        <button id='check-btn' onClick={() => this.checkEntries()}>Check game</button>
                        <div id='selec-newgame'>
                            <button id='btn-newgame' onClick={() => this.handleButtonClick('newgameOpt')}>New Game</button>
                        </div>
                    </div>
                    <div id='game-display'>
                        <div id='game-board'>
                            <div id='game-table-container'>
                                <div id='endgame'>
                                    <div id='container-congrats-newgame'>
                                        <div id='congrats-newgame'>
                                            <p>Congratulations!</p>
                                            <p id='solve-time'>{this.msTime(this.state.timeData.time)}</p>
                                            <div id='start-newgame-btn'><button onClick={() => { this.newgame('easy') }}>START NEW GAME</button></div>
                                        </div>
                                    </div>
                                </div>
                                <div id='game-table-hidden'>
                                </div>
                                <div id='play-btn' onClick={() => this.startStopTimer()}><img src={playBtn} alt='playBtn' /></div>
                                {this.state.newgameOpen && (<div id='selec-newgame-dropdown' ref={this.container}>
                                    <div className='selec-newgame-item'><div className='selec-newgame'>Are you sure you want to start a new game?</div>
                                        <div id='restart-game-opt'><button onClick={() => { this.newgame() }}>Yes</button><button onClick={() => this.handleButtonClick('resumegameOpt')}>No</button></div>
                                    </div>
                                </div>)}
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
                <div id='text-page'>
                    <div className='textContent'>
                        <div className='text-info' id='text-info1'>
                            <div className='paragraph'>
                                <h2 id='game-rules'>Game rules</h2>
                                <p>The main target of a sudoku game is to fill all vacant cells with values acording to the rules applied to it. Those rules are: there must only be one number from 1 to 9 in each roll, collum and 3x3 square in witch the cell is contained. These requirements must be fulfilled simultaneously.</p>
                            </div>
                            <div className='text-img-container'>
                                <img className='text-img' src={sudokuChecked} alt='sudokuCheckedImg' />
                            </div>
                        </div>
                        <div className='text-info' id='text-info2'>
                            <div className='text-img-container'>
                                <img className='text-img' src={sudokuMagazineBw} alt='sudoku-magazine-bw' />
                            </div>
                            <div className='paragraph'>
                                <h2 id='game-history'>About the game - Sudoku history</h2>
                                <p>Although the most popular version of the game, called <i>Sudoku</i>, the japanese version of the puzzle, the presumed origin of it is in the US in the 70's, more precisely in Indiana. At the time the puzzle did not find its popularity as in nowadays. </p><p>It was only after being introduced in Japan in the 80's that it became popular and also gained its name <i>Sūji wa dokushin ni kagiru</i> which can be translated as "the digits must be single" and was later commonly called by the first kanji of compound words to form and abbreviation, <i>Sudoku</i>. </p>
                            </div>
                        </div>
                        <div className='text-info' id='text-info3'>
                            <div className='paragraph'>
                                <h2 id='game-tips'>Tips and strategies</h2>
                                <p>It is a good practice when playing the puzzle to identify the board and get a sense of the distribution. Look for the squares, rows and columns that have more filled cells.</p><p>Scan rows from column to column and while marking down the missing numbers. Then scan over the current row in analysis and try to find the possible allocations to the missing numbers.
                                </p>
                            </div>
                            <div className='text-img-container'>
                                <img className='text-img' src={sudokuPossibilities} alt='sudokuPossibilities' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}