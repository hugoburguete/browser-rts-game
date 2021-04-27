import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import Body from './components/Body/Body';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Body />
      </Router>
    </div>
  );
}

export default App;
