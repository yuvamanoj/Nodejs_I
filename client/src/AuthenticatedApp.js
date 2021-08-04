import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Root from './components/root/Root';
import Registration from './components/registration/Registration';
import Status from './components/status/Status';


const AuthenticatedApp = () => {
    return (
        <>
        <Switch>
          <Root>
            <main>
              <Route exact path="/" component={Registration} />
              <Route path="/registration" component={Registration} />
              <Route path="/status" component={Status} />
            </main>
          </Root>
        </Switch>
        </>
    )
}

export default AuthenticatedApp;