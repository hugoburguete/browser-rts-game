import React, { FormEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../ProvideAuth/ProvideAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const history = useHistory();

  const login = async (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    auth.login(email, password).then(() => {
      history.replace('/about');
    });
  };

  return (
    <form onSubmit={(e) => login(e)} method="post">
      <div className="row">
        <div className="six columns">
          <label htmlFor="login-email">Your email</label>
          <input
            className="u-full-width"
            id="login-email"
            type="text"
            name="email"
            placeholder="test@mailbox.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="six columns">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            className="u-full-width"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <input
        className="button-primary"
        onClick={(e) => login(e)}
        type="submit"
        value="Login"
      />
    </form>
  );
};
