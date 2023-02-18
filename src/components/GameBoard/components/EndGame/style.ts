import { CSSProperties } from 'react';

export const endGameStyle: CSSProperties = {
    border: '2px solid #000',
    backgroundColor: '#fff',
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

export const congratulationContainerStyle: CSSProperties = {
    borderRadius: '5px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
};

export const congratulationStyle: CSSProperties = {
    border: '1px solid #fff',
    borderRadius: '5px',
    padding: '5px',
    backgroundColor: '#000',
    textAlign: 'center',
    color: 'white',
};

export const congratulationButtonStyle: CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid #000',
    margin: '0.5rem 1rem',
    padding: '5px 8px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 500,
};
