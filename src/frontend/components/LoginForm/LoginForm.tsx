import React, { FormEvent, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../ProvideAuth/ProvideAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword ] = useState('');
  const auth = useAuth();
  const history = useHistory();
  
  const login = async (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    auth.login(email, password)
      .then(() => {
        history.replace("/about");
      })
  }

  return (
    <form onSubmit={e => login(e)} method="post">
      <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" onClick={(e) => login(e)}>login</button>
    </form>
  )
}