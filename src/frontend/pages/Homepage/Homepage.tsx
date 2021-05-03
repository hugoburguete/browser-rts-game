import React from 'react';
import { Link } from 'react-router-dom';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { useAuth } from '../../components/ProvideAuth/ProvideAuth';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Page } from '../../components/Page/Page';

export const Homepage = () => {
  let auth = useAuth();

  return (
    <Page>
      <div className="container">
        {auth.user != '' ? (
          <p>Logged in - go to the game</p>
        ) : (
          <div>
            <div>
              <h2>Register 3:</h2>
              <RegistrationForm />
            </div>
            <div>
              <h2>Login:</h2>
              <LoginForm />
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
