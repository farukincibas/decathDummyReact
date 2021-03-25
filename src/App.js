import React from 'react';
import Home from './Home';
import Users from './User';
import UserDetail from './UserDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import history from './history';


function App() {
  return (
    <>
      <Router history={history}>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/userdetail">
              <UserDetail />
            </Route>
          </Switch>
        </div>
      </Router>

    </>
  );
}

export default App;
