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
