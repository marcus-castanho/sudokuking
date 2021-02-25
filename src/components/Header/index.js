import React from "react";
import "./style.css";
import sudokuKingLogo from './images/sudoku-king-logo.png'

const Header = () => (
    <header id='main-header'>
        <div id='master-header'>
            <div id='content-header'>
                <a id="sudoku-king-logo" href="http://sudoku-king.com/" target='_blank' rel="noopener noreferrer"> <img id='sudoku-king-logo-img' src={sudokuKingLogo} alt='sudoku-king-logo' /></a>
                <div id='account-controller'>
                    <button id='btn-login-options'>Login</button>
                    <div id='account-options'>
                        <input placeholder='Email'></input>
                        <input placeholder='Password'></input>
                        <p id='forgotPassword-options'>Forgot Password?</p>
                        <button id='btn-login'>Login</button>
                        <p>Don't have an account?<a id='signin-options'>Sign in</a></p>
                    </div>
                </div>
            </div>
            <select id="lang-select">
                <option value="0">en</option>
            </select>
        </div>
    </header>
);

export default Header;