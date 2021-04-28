import React, { useEffect } from 'react';
import './App.scss';
import Body from './components/Body/Body';
import { Header } from './components/Header/Header';
import { useAuth } from './components/ProvideAuth/ProvideAuth';
import Loading from './components/Loading/Loading';

function App() {
  const auth = useAuth();

  useEffect(() => {
    auth.loadUser();
  }, []);

  if (auth.isUserLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
}

export default App;
