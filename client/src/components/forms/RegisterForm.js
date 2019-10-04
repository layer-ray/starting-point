import React, {useState} from "react";
import {connect} from "react-redux";

import {registerWithCredentials_AC} from "../../redux/actions/usersActions";

import styles from "./form.module.scss";

const LoginForm = props => {

    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("testtest");
    const [username, setUsername] = useState("Tester");

    const handleChange = e => {
        switch(e.target.id) {
            case "password":
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "username":
                setUsername(e.target.value);
            default:
                break;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.registerMailPwd({username, email, password}, props.history);
    };

    return(
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <div className={styles["form-field"]}>
                <label htmlFor="username"> Username: </label>
                <input 
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleChange}
                />
            </div>
            <div className={styles["form-field"]}>
                <label htmlFor="email"> Email: </label>
                <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                />
            </div>
            <div className={styles["form-field"]}>
                <label htmlFor="password"> Password: </label>
                <input 
                    id="password"
                    type="text"
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <div className={styles["form-field"]}>
                <input type="submit" value="Sign up" className={styles.button} />
            </div>
        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    registerMailPwd: (data, history) =>
         dispatch(registerWithCredentials_AC(data, history)),
})

export default connect(null, mapDispatchToProps)(LoginForm);