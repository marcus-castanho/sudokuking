import { CSSProperties } from 'react';

export const gameStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 60px 0',
};

export const gameDisplayStyle: CSSProperties = {
    flex: 1,
    margin: '5px 0 10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
};

export const gameBoardStyle: CSSProperties = {
    margin: ' 5px auto 10px',
    flex: 1,
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    paddingTop: 0,
};

export const gameTableContainerStyle: CSSProperties = {
    height: '100%',
    paddingTop: '100%',
    position: 'relative',
};

export const endGameStyle: CSSProperties = {
    border: '2px solid #000',
    backgroundColor: '#fff',
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    // display: 'none',
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

export const gameControllerStyle: CSSProperties = {
    width: '100%',
    height: '45px',
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
};

export const controllerTableStyle: CSSProperties = {
    width: '100%',
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
};
