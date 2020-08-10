import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from "redux";
import apiMiddleware from "./redux/middleware/apiMiddleware";
import trainingsMiddleware from "./redux/middleware/trainingsMiddleware";
import {rootReducer} from "./redux/reducers/rootReducer";
import 'bootstrap/dist/css/bootstrap.min.css';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
    trainingsMiddleware,
    apiMiddleware,
));

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    enhancer
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
