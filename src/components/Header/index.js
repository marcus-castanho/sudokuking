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
                    {/*<div className='account-options'>
                        <input placeholder='Email'></input>
                        <input placeholder='Password'></input>
                        <p id='forgotPassword-options'>Forgot Password?</p>
                        <button id='btn-login'>Login</button>
                        <p>Don't have an account?<a id='signin-options'>Sign in</a></p>
</div>*/}
                    {/*<div className='account-options'>
                    <p className='input-title'>Inser a username</p>
                        <input placeholder='Username'></input>
                        <p className='input-title'>Inser a valid email</p>
                        <input placeholder='Email'></input>
                        <p className='input-title'>Inser a password</p>
                        <input placeholder='Password'></input>
                        <button id='btn-signin'>Sign in</button>
                        <p>Already have an account?<a id='signin-options'>Login</a></p>
                    </div>*/}
                    {/*<div className='account-options'>
                        <p className='input-title'>Inser your email</p>
                        <input placeholder='Email'></input>
                        <button id='btn-sendForgotPassword'>Send token</button>
                        <input placeholder='Reset password token'></input>
                        <p className='input-title'>Inser a new password</p>
                        <input placeholder='New passowrd'></input>
                        <button id='btn-resetPassword'>Reset password</button>
                        <p>Already have an account?<a id='signin-options'>Login</a></p>
                    </div>*/}
                    {/*<div className='account-options'>
                        <p>Hello **NAME**</p>
                        <button id='btn-logout'>Logout</button>
                        <p>Do you want do delete your account?</p>
                    </div>*/}
                </div>
            </div>
            <select id="lang-select">
                <option value="0">en</option>
            </select>
        </div>
    </header>
);

export default Header;