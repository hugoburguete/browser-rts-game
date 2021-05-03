import React from 'react';
import { useHistory } from 'react-router';
import { Page } from '../../components/Page/Page';
import { useAuth } from '../../components/ProvideAuth/ProvideAuth';

export const About = () => {
  const auth = useAuth();
  const history = useHistory();

  const signOut = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <Page>
      <div className="container">
        <h1>About us!</h1>
        <p>{auth.user}</p>
        <button onClick={signOut}>logout</button>
      </div>
    </Page>
  );
};
