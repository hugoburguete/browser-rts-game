import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../ProvideAuth/ProvideAuth';

export const Header = () => {
  const auth = useAuth();

  return (
    <nav className="nav-main">
      <div className="container">
        <ul className="row">
          <li className="one column">
            <Link to="/">Home</Link>
          </li>
          {auth.user == '' ? (
            ''
          ) : (
            <li className="one column">
              <Link to="/overview">Go to game</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
