import React from "react";

import {Route} from "react-router-dom";
import ProtectedRoute from "./components/privateRoute";
import Navbar from "./components/navbar";
import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import Alert from "./components/alert";
import Profile from "./components/profile";
import UserList from "./components/listUser";

const App = () => {

    return (
        <>
            <Navbar />
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm} />
            <Route path="/list" component={UserList} />
            <ProtectedRoute path="/profile" component={Profile} isAuth={false}/>
            <Alert />
        </>
    );
};

export default App;