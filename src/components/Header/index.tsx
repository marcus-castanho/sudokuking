import React, { FC } from 'react';
import './style.css';
import sudokuKingLogo from '../../assets/images/sudoku-king-logo.png';

export const Header: FC = () => (
    <header
        id="main-header"
        style={{
            width: '100%',
            height: '60px',
            borderBottom: '1px solid rgba(110,110,110,0.5)',
        }}
    >
        <div id="master-header">
            <div
                id="content-header"
                style={{
                    margin: '20px 0 0 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    lineHeight: '1.5',
                }}
            >
                <a
                    id="sudoku-king-logo"
                    href="http://sudoku-king.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '20px',
                    }}
                >
                    {' '}
                    <img
                        id="sudoku-king-logo-img"
                        src={sudokuKingLogo}
                        alt="sudoku-king-logo"
                        style={{
                            width: '30%',
                        }}
                    />
                </a>
            </div>
            <select
                id="lang-select"
                style={{
                    float: 'right',
                    margin: '5px 0',
                    border: 'none',
                }}
            >
                <option value="0">en</option>
            </select>
        </div>
    </header>
);
