import React, { FC } from 'react';
import { checkButtonStyle } from './style';
import './style.css';

export const CheckGameButton: FC = () => {
    return (
        <button
            id="check-btn"
            style={checkButtonStyle}
            onClick={
                () => console.log('checkEntries')
                // this.checkEntries()
            }
        >
            Check game
        </button>
    );
};
