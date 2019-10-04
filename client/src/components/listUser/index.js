import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {getUserList} from "../../redux/actions/usersActions";


const List = props => {

    const [list, setList] = useState([]);

    useEffect(() => {
        (async () => {
            await props.getList();
        })();
    }, []);

    useEffect(() => {
        setList(props.userList);
    }, [props.userList])

    return (
        <ul>
            {list.map(el => {
                return  <li key={el._id}>Name: {el.username}</li>
            })}
        </ul>
    );
};

const mapStateToProps = state => ({
    userList: state.userList
});

const mapDispatchToProps = dispatch => ({
    getList: () => dispatch(getUserList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);