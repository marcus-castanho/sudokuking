import React, { FC } from 'react';
import { hiddenGameStyle, playButtonStyle } from './style';
import playBtn from '../../../../assets/images/playBtn.png';
import './style.css';

export type HiddenGameProps = {
    handleUnpauseGame: () => void;
};

export const HiddenGame: FC<HiddenGameProps> = ({ handleUnpauseGame }) => {
    return (
        <>
            <div id="game-table-hidden" style={hiddenGameStyle} />;
            <div
                id="play-btn"
                style={playButtonStyle}
                onClick={handleUnpauseGame}
            >
                <img src={playBtn} alt="playBtn" style={{ height: '100%' }} />
            </div>
        </>
    );
};
