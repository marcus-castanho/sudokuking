import React, { FC, useState, useEffect, useRef } from 'react';
import {
    hiddenGameStyle,
    playButtonStyle,
    selectNewGameDropdownStyle,
    selectNewGameItem,
    selectNewGameStyle,
} from './style';
import playBtn from '../../../../assets/images/playBtn.png';
import './style.css';

export type HiddenGameProps = {
    startStopTimer: () => void;
};

export const HiddenGame: FC<HiddenGameProps> = ({ startStopTimer }) => {
    const newGameDropDownRef = useRef(null);
    const [newGameOpen, setNewGameOpen] = useState(false);

    //remover apos implementar jogo
    useEffect(() => {
        setNewGameOpen(true);
    }, []);

    return (
        <>
            <div id="game-table-hidden" style={hiddenGameStyle} />;
            <div id="play-btn" style={playButtonStyle} onClick={startStopTimer}>
                <img src={playBtn} alt="playBtn" style={{ height: '100%' }} />
            </div>
            {newGameOpen && (
                <div
                    id="selec-newgame-dropdown"
                    style={selectNewGameDropdownStyle}
                    ref={newGameDropDownRef}
                >
                    <div
                        className="selec-newgame-item"
                        style={selectNewGameItem}
                    >
                        <div
                            className="selec-newgame"
                            style={selectNewGameStyle}
                        >
                            Are you sure you want to start a new game?
                        </div>
                        <div id="restart-game-opt">
                            <button
                                onClick={() => {
                                    console.log('newgame');
                                    // this.newgame();
                                }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    console.log('handleButtonClick');
                                    // this.handleButtonClick('resumegameOpt')
                                }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
