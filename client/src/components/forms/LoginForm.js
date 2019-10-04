import React, {useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {loginWithCredentials_AC} from "../../redux/actions/usersActions";

import styles from "./form.module.scss";

const LoginForm = props => {

    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("testtest");

    const handleChange = e => {
        e.target.id === "password"
            ? setPassword(e.target.value)
            : setEmail(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.loginMailPwd(email, password, props.history);
    };

    return(
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <div className={styles["form-field"]}>
                <label htmlFor="email"> Email: </label>
                <input 
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <div className={styles["form-field"]}>
                <label htmlFor="password"> Password: </label>
                <input 
                    id="password"
                    name="password"
                    type="text"
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <div className={styles["form-field"]}>
                <input type="submit" value="Login" className={styles.button}/>
            </div>
        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    loginMailPwd: (email, pwd, history) =>
         dispatch(loginWithCredentials_AC(email, pwd, history)),
})

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));