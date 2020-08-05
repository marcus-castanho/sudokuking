import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/main';
import "./style.css";
import ReactGA from 'react-ga';

const trackingId = "G-9D80N6ZH4D";
ReactGA.initialize(trackingId);
ReactGA.pageview('/');

const App = () => (
  <div className="App">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
