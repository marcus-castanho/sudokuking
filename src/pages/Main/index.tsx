import React, { CSSProperties, FC } from 'react';
import { Footer, GameHeader, Header } from '../../components';
export const gameStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 60px 0',
};

export const Main: FC = () => {
    return (
        <>
            <Header />
            <div className="game" style={gameStyle}>
                <GameHeader />
            </div>
            <Footer />
        </>
    );
};
