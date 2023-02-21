import { CSSProperties } from 'react';

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

export const buttonNewGameStyle: CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid rgba(110, 110, 110, 0.5)',
    padding: '5px',
    width: '35%',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
};
