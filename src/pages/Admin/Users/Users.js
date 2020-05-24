import React, {useEffect, useState} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import {getUsersApi} from "../../../api/user";

const Users = () => {
    const [users, setUsers] = useState([]);
    const token = getAccessTokenApi();
    console.log(users)

    useEffect(  () => {
        const fetchData = async () => {
            const res = await getUsersApi(token);
            setUsers(res);
        }
        fetchData();
    }, [token])

    return (
        <div className="users">
            usuarios
        </div>
    )
}

export default Users