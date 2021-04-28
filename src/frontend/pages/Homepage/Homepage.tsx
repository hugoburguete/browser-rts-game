import React from 'react';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import { useAuth } from "../../components/ProvideAuth/ProvideAuth";
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const Homepage = () => {
  let auth = useAuth();

  return (
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
  )
}