import axios from "axios";
import jwtDecode from "jwt-decode";

import {loginWithCredentials, userList, removeUser,
        SET_ALERT, LOGOUT } from "../types";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
});
// use the error messages from the server
axiosInstance.interceptors.response.use(null, error => error.response);

export const loginWithCredentials_AC = (email, password, history) => async dispatch => {
    try {
        const {data} = await axiosInstance.post("/user/login", {email, password});
        // conditional used as fallback (axios take advantage of http codes, e.g. fetch doesn't)
        if(data.error){ 
            dispatch({type: SET_ALERT, payload: {msg: data.error, type: "error"}});
        } else {
            localStorage.setItem("token", data.token);
            const decoded = jwtDecode(data.token);
            dispatch({type: loginWithCredentials.SUCCESS, payload: decoded.user});
            dispatch({type: SET_ALERT, payload: {msg: "Login successful", type: "success"}});
            history.push("/profile");
        }
    } catch(error){
        dispatch({type: SET_ALERT, payload: {msg: error.message, type: "error"}});
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    return {type: LOGOUT};
};

export const registerWithCredentials_AC = (creds, history) => async dispatch => {
    try {
        const {data} = await axiosInstance.post("/user/register", creds);

        if(data.error){
            dispatch({type: SET_ALERT, payload: {msg:data.error, type: "error"}});
        } else {
            localStorage.setItem("token", data.token);
            dispatch({type: SET_ALERT, payload: {msg:"Registration successful", type: "success"}});
            history.push("/login");
        }
    } catch(error){
        console.error(error.message);
        dispatch({type: SET_ALERT, payload: {msg:error.message, type: "error"}});
    };
};

export const getUserList = () => async dispatch => {
    try {
        const {data} = await axiosInstance.get("/user/list");
        if(data.error){
            dispatch({type: SET_ALERT, payload: {msg:data.error, type: "error"}});
        } else {
            dispatch({type: userList.SUCCESS, payload: data.userList});
        }
    } catch(error){
        console.error(error.message);
        dispatch({type: SET_ALERT, payload: {msg: error.message, type: "error"}});
    };
};

export const deleteUser = (id, history) => async dispatch => {
    const token = localStorage.getItem("token");

    try {
        const {data} = await axiosInstance.delete("/user/profile/" + id, 
                                                    {headers: {Authorization: `BEARER ${token}`}});
        if(data.error){
            dispatch({type: SET_ALERT, payload:{msg: data.error, type: "error"}});
        } else {
            dispatch({type: LOGOUT});
            localStorage.removeItem("token");
            history.push("/login");
            dispatch({type: SET_ALERT, payload: {msg: data.message, type: "success"}});
        }
    } catch(error){
        console.error(error.message);
        dispatch({type: SET_ALERT, payload: {msg:error.message, type: "error"}});
    };
};