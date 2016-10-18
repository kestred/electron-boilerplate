import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, Router } from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import routes from './routes';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  /* Reducer */
  combineReducers({
    routing: routerReducer,

    /*

     ... other components ...

     */
  }),

  /* Middleware */
  applyMiddleware(sagaMiddleware)
);
const history = syncHistoryWithStore(hashHistory, store);
/* sagaMiddleware.run(mySagas); */

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes(store)} />
  </Provider>
  , document.querySelector('main') as Element
);
