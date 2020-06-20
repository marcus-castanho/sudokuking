import React from "react";
import "./style.css";

const Header = () => (
    <header id='main-header'>
        <div id='master-header'>
            <div id='content-header'>
                <a id="logo-sudoku-king" href="https://sudoku.com">Sudoku King</a>
                <button id='signin-btn'>Sign in</button>
            </div>
            <select id="lang-select">
                <option value="0">en</option>
            </select>
        </div>
    </header>
);

export default Header;