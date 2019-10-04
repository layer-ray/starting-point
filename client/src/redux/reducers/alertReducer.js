import {SET_ALERT, CLEAN_ALERT} from "../types";

export const alertReducer = (state={msg: "", type:"error"}, action) => {
    switch(action.type) {
        case SET_ALERT:
            return action.payload;
        case CLEAN_ALERT:
            return {msg: "", type: "error"};
        default:
            return state;
    };
};