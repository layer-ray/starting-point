import React from "react";
import {connect} from "react-redux";
import {deleteUser} from "../../redux/actions/usersActions";

import styles from "./profile.module.scss";

const Profile = ({remove, user, history}) => {

    return (
    <div>
        <dl className={styles.list}>
            <div>
                <dt>Id: </dt>
                <dd>{user._id}</dd>
            </div>
            <div>
                <dt>Email: </dt>
                <dd>{user.email}</dd>
            </div>
            <div>
                <dt>Username: </dt>
                <dd>{user.username}</dd>
            </div>
        </dl>
        <div className={styles.footer}>
            <button 
                onClick={() => remove(user._id, history)}
                className={styles.button}
            >
                    Remove user
            </button>
        </div>
    </div>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    remove: (id, history) => dispatch(deleteUser(id, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);