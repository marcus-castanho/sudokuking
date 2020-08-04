import React from "react";
import "./style.css";
import sudokuKingLogo from './images/sudoku-king-logo.png'

const Header = () => (
    <header id='main-header'>
        <div id='master-header'>
            <div id='content-header'>
                <a id="sudoku-king-logo" href="https://github.com/marcus-castanho" target='_blank' rel="noopener noreferrer"> <img id='sudoku-king-logo-img' src={sudokuKingLogo} alt='sudoku-king-logo' /></a>
            </div>
            <select id="lang-select">
                <option value="0">en</option>
            </select>
        </div>
    </header>
);

export default Header;