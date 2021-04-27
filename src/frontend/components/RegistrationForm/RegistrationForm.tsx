import React, { useState } from 'react';
import { User } from '../../../common/entities/user.entity';
import { makePostRequestToApi } from '../../utils/http';

export const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  
  const register = async () => {
    const user: User = {
      email: email,
      password: password,
      username: username
    }

    const response = await makePostRequestToApi('/register', user);
    console.log(response);
  }

  return (
    <form onSubmit={register}>
      <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" name="email" value={email} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}