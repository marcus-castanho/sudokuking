import React, { CSSProperties, FC } from 'react';
import { Footer, GameHeader, Header, Timer } from '../../components';
import { useTimer } from '../../components/Timer/hooks';

export const gameStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 60px 0',
};

export const Main: FC = () => {
    const { counter, startStopTimer, resetTimer } = useTimer();

    return (
        <>
            <Header />
            <div className="game" style={gameStyle}>
                <GameHeader>
                    <Timer
                        counter={counter}
                        startStopTimer={startStopTimer}
                        resetTimer={resetTimer}
                    />
                </GameHeader>
            </div>
            <Footer />
        </>
    );
};
