import { CSSProperties } from 'react';

export const hiddenGameStyle: CSSProperties = {
    border: '2px solid #000',
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'block',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

export const playButtonStyle: CSSProperties = {
    zIndex: 3,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
    height: '10%',
};
