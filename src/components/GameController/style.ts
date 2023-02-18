import { CSSProperties } from 'react';

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

export const controllerRowStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
};

export const controllerCellStyle: CSSProperties = {
    border: '1px solid black',
    flex: 1,
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
