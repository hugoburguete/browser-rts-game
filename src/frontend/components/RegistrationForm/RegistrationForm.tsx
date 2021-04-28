import React, { FormEvent, useState } from 'react';
import { User } from '../../../common/entities/user.entity';
import { makeApiPostRequest } from '../../utils/http';
import { storeAuthTokens } from '../../utils/auth';

export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e: FormEvent | MouseEvent) => {
    e.preventDefault();

    const user: User = {
      email: email,
      password: password,
      username: username,
    };

    const response = await makeApiPostRequest('register', user);
    // @todo Error validation
    storeAuthTokens(response);
  };

  return (
    <form onSubmit={(e) => register(e)} method="post">
      <div className="row">
        <div className="four columns">
          <label htmlFor="register-username">Your username</label>
          <input
            className="u-full-width"
            id="register-username"
            placeholder="hero-123"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="four columns">
          <label htmlFor="register-email">Your email</label>
          <input
            className="u-full-width"
            id="register-email"
            placeholder="test@mailbox.com"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="four columns">
          <label htmlFor="register-password">Your password</label>
          <input
            className="u-full-width"
            id="register-password"
            placeholder="test@mailbox.com"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <input
        className="button-primary"
        onClick={(e) => register(e)}
        type="submit"
        value="Register"
      />
    </form>
  );
};
