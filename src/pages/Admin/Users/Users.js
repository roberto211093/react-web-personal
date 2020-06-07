import React, {useEffect, useState} from "react";
import {getAccessTokenApi} from "../../../api/auth";
import {getUsersActiveApi} from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";

const Users = () => {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const [reloadUsers, setReloadUsers] = useState(false);
    const token = getAccessTokenApi();

    useEffect(() => {
        const fetchData = async () => {
            const usersActive = await getUsersActiveApi(token, true);
            setUsersActive(usersActive.users);
            const usersInactive = await getUsersActiveApi(token, false);
            setUsersInactive(usersInactive.users);
        }
        fetchData();
        setReloadUsers(false)
    }, [token, reloadUsers])

    return (
        <div className="users">
            <ListUsers
                usersActive={usersActive}
                usersInactive={usersInactive}
                setReloadUsers={setReloadUsers}
            />
        </div>
    )
}

export default Users