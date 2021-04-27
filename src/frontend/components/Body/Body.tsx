import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { FourOhFour } from '../../pages/404/404';
import { About } from '../../pages/About/About';
import { Homepage } from '../../pages/Homepage/Homepage';

const Body = () => {
  return (
    <div className="App">
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/"><Homepage /></Route>
        <Route exact path="/about"><About /></Route>
        <Route path="*"><FourOhFour /></Route>
      </Switch>
    </div>
  );
}

export default Body;
