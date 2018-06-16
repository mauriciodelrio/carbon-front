
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; //eslint-disable-line
import { routerReducer, routerMiddleware } from 'react-router-redux';
import getRootReducer from './reducers';
import carbonAPI from './lib/api';
import errorTracker from './lib/errorTracker';

const Api = new carbonAPI();

const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const getStore = (store, history) => createStore(getRootReducer(routerReducer), store, enhancedCompose(
  applyMiddleware(thunk.withExtraArgument(Api)),
  applyMiddleware(logger),
  applyMiddleware(errorTracker()),
  applyMiddleware(routerMiddleware(history))
));

export { getStore };

