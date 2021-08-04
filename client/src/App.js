// import '@carbon/ibm-security/css/index.min.css';
import 'carbon-components/scss/globals/scss/styles.scss';
// import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import { Provider } from 'react-redux';
// import ReactPiwik from 'react-piwik';
import { applyMiddleware, compose, createStore } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { CookiesProvider } from "react-cookie";

import AuthenticatedApp from './AuthenticatedApp';
import Login from './components/login/Login';
import './App.scss';
import reducers from './reducers'
import rootSaga from './sagas/rootSaga';

// const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });

const sagaMiddleware = createSagaMiddleware();
const middleWare = [sagaMiddleware];

let allEnchancers = compose(responsiveStoreEnhancer, applyMiddleware(...middleWare));
if (process.env.NODE_ENV === 'development') {
  middleWare.push(logger);
  allEnchancers = compose(allEnchancers, devToolsEnhancer());
};

const store = createStore(reducers, allEnchancers);
sagaMiddleware.run(rootSaga);

const App = () => {

  return (
    <div className="App">
      <CookiesProvider>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <AuthenticatedApp />
            </Switch>
          </Router>
        </Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
