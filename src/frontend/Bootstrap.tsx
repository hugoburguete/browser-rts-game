import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ProvideAuth } from './components/ProvideAuth/ProvideAuth';

function AppBootstrap() {
  return (
    <Router>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Router>
  );
}

export default AppBootstrap;
