import React, { FormEvent, useState } from 'react';
import { User } from '../../../common/entities/user.entity';
import { makeApiPostRequest } from '../../utils/http';
import { storeAuthTokens } from '../../utils/auth';

export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  
  const register = async (e: FormEvent | MouseEvent) => {
    e.preventDefault();

    const user: User = {
      email: email,
      password: password,
      username: username
    }

    const response = await makeApiPostRequest('register', user);
    // @todo Error validation
    storeAuthTokens(response);
  }

  return (
    <form onSubmit={e => register(e)} method="post">
      <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={(e) => register(e)}>Register</button>
    </form>
  )
}