import React, { Component } from "react";
import "./style.css"

export default class Main extends Component {

    render() {
        return (
            <div className='game'>
                <div id='game-page'>
                    <div id='game-header'>
                        <div id='game-info'>
                            <p>Difficulty</p>
                            <p>01:10:05</p>
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
                        <div id='game-board'><p>Jogo</p></div>
                        <div id='game-controller'>teclado</div>
                    </div>
                    <div id='adsense'></div>
                </div>
            </div>
        )
    }
}