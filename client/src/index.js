import React from "react";
import ReactDOM from "react-dom";

import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunkMw from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import jwtDecode from "jwt-decode";

import App from "./App";
import {rootReducer} from "./redux/reducers";

import {loginWithCredentials, SET_ALERT} from "./redux/types";

import "./globalScss/index.scss";
import "./globalScss/reset.scss";

const store = createStore(rootReducer, applyMiddleware(thunkMw));

const token = localStorage.getItem("token");
if(token){
    try {
        const decoded = jwtDecode(token);
        if(!decoded.user){
            throw new Error("Invalid token");
        };

        store.dispatch({type: loginWithCredentials.SUCCESS, payload: decoded.user});
    } catch(error) {
        store.dispatch({type: SET_ALERT, payload: {msg: error.message, type: "error"}});
    };
};

const rootDiv = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    rootDiv);