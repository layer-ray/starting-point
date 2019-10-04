import React from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {logout} from "../../redux/actions/usersActions";
import styles from "./navbar.module.scss";

const Navbar = ({loggedUser, logOut}) => {
    
    return (
        <div>
            <nav>
                <ul className={styles.list}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/list">Users</Link>
                    </li>
                    {loggedUser.username
                    ?   
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <button onClick={logOut} className={styles["nav-button"]}>
                                    Logout
                                </button>
                            </li>
                        </>
                    :   
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
            <div className={styles.headline}>
                {loggedUser.username ? `User logged in:${loggedUser.username}` : "Log in bro!" }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loggedUser: state.user
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));