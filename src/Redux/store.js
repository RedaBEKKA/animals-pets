/* eslint-disable */

import React from 'react'
import {applyMiddleware, compose, createStore} from 'redux'
import rootReducer from './Reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider
