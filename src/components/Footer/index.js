import React from 'react';
import './style.css';
import githubLogo from './images/github-logo.png'
import linkedinLogo from './images/linkedin-logo2.png'

const Footer = () => (
    <footer id='main-footer'>
        <div id='master-footer'>
            <p>Sudoku King, developed by<br />Marcus Castanho</p>
            <div id='links'>
                <a href='https://linkedin.com/in/marcus-castanho-b52199114' target='_blank'>
                    <img src={linkedinLogo} />
                </a>
                <a href="https://github.com/marcus-castanho" target='_blank'>
                    <img src={githubLogo} />
                </a>
            </div>
        </div>
    </footer >
);

export default Footer;