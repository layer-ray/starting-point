import {loginWithCredentials, LOGOUT, userList} from "../types";

export const userReducer = (state={}, action) => {
    switch(action.type){
        case loginWithCredentials.LOADING:
            return state;
        case loginWithCredentials.SUCCESS:
            return action.payload;
        case LOGOUT:
            return {};
        default:
            return state;
    };
};

export const userListReducer = (state=[], action) => {
    switch(action.type){
        case userList.LOADING:
            return state;
        case userList.SUCCESS:
            return action.payload;
        default:
            return state;
    };
}