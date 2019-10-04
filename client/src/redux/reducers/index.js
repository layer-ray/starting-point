import {combineReducers} from "redux";

import {userReducer, userListReducer} from "./usersReducer";
import {alertReducer} from "./alertReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    userList: userListReducer,
    alert: alertReducer
});