import React from 'react';
import { Link } from 'react-router-dom';

export const GameHeader = () => {
  return (
    <header>
      <div className="container">
        <ul className="row">
          <li className="one column">
            <Link to="/overview">Overview</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
