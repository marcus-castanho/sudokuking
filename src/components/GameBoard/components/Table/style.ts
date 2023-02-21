import { CSSProperties } from 'react';

export const gameTableStyle: CSSProperties = {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

export const gameTableBodyStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    zIndex: 0,
};

export const gameRowStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
};

export const gameCellStyle: CSSProperties = {
    border: '1px solid black',
    flex: 1,
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
