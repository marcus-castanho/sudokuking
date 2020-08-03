import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/main';
import "./style.css";

const App = () => (
  <div className="App">
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
