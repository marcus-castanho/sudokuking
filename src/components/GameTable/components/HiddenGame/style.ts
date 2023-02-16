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

export const selectNewGameDropdownStyle: CSSProperties = {
    display: 'block',
    border: '1px solid rgba(110,110,110,0.5)',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '2px',
    zIndex: 3,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
};

export const selectNewGameItem: CSSProperties = {
    listStyleType: 'none',
    textAlign: 'center',
    padding: '5px',
};

export const selectNewGameStyle: CSSProperties = {
    border: 'none',
    width: '100%',
    paddingBottom: '5px',
    backgroundColor: '#fff',
};
