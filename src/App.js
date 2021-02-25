import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import "./style.css";
import ReactGA from 'react-ga';
import Routes from './routes'



const App = () => {

  useEffect(() => {
    ReactGA.initialize('UA-175176015-1');
    ReactGA.pageview('/');
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes />
      <Footer />
    </div>)
};

export default App;
