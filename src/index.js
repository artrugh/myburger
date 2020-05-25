import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// REDUX / REACT-REDUX
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { Provider } from 'react-redux';

// REDUCERS
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'

// MIDDLEWARE
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// SAGAS
import {
  watchAuth,
  watchBurgerBuilder,
  watchOrders
} from './store/sagas'

// STYLE
import './index.css';

// APP
import App from './App';

const composeEnhancers = process.env.NODE_ENV === 'development' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// ROOTREDUCERS - AUTH - BURGER - ORDERS
const rootReducer = combineReducers({
  auth: authReducer,
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer
})
// INITIATE SGA
const sagaMiddleware = createSagaMiddleware();

// CREATE STORE / MIDDLEWARE = THUNK / SAGA
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
))

// RUN ALL THE SAGA ACTIONS
sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrders)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

// DOM
ReactDOM.render(
  app,
  document.getElementById('root')
);
