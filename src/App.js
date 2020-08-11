import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/main';
import "./style.css";
import ReactGA from 'react-ga';


function googleAn() {
  useEffect(() => {
    ReactGA.initialize('UA-175176015-1');
    ReactGA.pageview('/');
  }, [])

}

const App = () => (
  <div className="App">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
