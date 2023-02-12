import { CSSProperties } from 'react';

export const gamePageStyle: CSSProperties = {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
};

export const gameHeaderStyle: CSSProperties = {
    margin: '10px 0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const gameInfoStyle: CSSProperties = {
    border: '1px solid black',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    padding: '0.2rem',
    marginBottom: '1px',
};

export const checkButtonStyle: CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid rgba(110,110,110,0.5)',
    padding: '5px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
};
