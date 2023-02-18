import React, { FC, useRef } from 'react';
import {
    buttonNewGameStyle,
    selectNewGameDropdownStyle,
    selectNewGameItem,
    selectNewGameStyle,
} from './style';
import './style.css';

export const SelecNewGameMessage: FC = () => {
    const newGameDropDownRef = useRef(null);

    return (
        <div
            id="selec-newgame-dropdown"
            style={selectNewGameDropdownStyle}
            ref={newGameDropDownRef}
        >
            <div className="selec-newgame-item" style={selectNewGameItem}>
                <div className="selec-newgame" style={selectNewGameStyle}>
                    Are you sure you want to start a new game?
                </div>
                <div id="restart-game-opt">
                    <button
                        onClick={() => {
                            console.log('newgame');
                            // this.newgame();
                        }}
                        style={buttonNewGameStyle}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => {
                            console.log('handleButtonClick');
                            // this.handleButtonClick('resumegameOpt')
                        }}
                        style={buttonNewGameStyle}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};
