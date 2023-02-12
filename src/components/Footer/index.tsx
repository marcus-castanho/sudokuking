import React, { FC } from 'react';
import githubLogo from '../../assets/images/github-logo.png';
import linkedinLogo from '../../assets/images/linkedin-logo2.png';

const achorImagestyle = {
    height: '30px',
    margin: '0 10px',
};

export const Footer: FC = () => (
    <footer
        id="main-footer"
        style={{
            padding: '0 15%',
            height: '60px',
            width: '100%',
            borderTop: '1px solid rgba(110,110,110,0.5)',
            position: 'absolute',
            bottom: '0',
            backgroundColor: '#fff',
            marginBottom: '0',
        }}
    >
        <div
            id="master-footer"
            style={{
                fontSize: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px 0 0 0',
            }}
        >
            <p>
                Sudoku King, developed by
                <br />
                Marcus Castanho
            </p>
            <div id="links">
                <a
                    href="https://linkedin.com/in/marcus-castanho-b52199114"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={achorImagestyle}
                >
                    <img
                        src={linkedinLogo}
                        alt="linkedinLogo"
                        style={achorImagestyle}
                    />
                </a>
                <a
                    href="https://github.com/marcus-castanho"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={achorImagestyle}
                >
                    <img
                        src={githubLogo}
                        alt="githubLogo"
                        style={achorImagestyle}
                    />
                </a>
            </div>
        </div>
    </footer>
);
