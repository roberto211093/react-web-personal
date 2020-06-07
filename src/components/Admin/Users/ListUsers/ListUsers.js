import React, {useEffect, useState} from "react";
import {Switch, List, Avatar, Button} from "antd";
import {EditOutlined, CheckOutlined, StopOutlined, DeleteOutlined} from '@ant-design/icons';
import noAvatar from "../../../../assets/img/png/no-avatar.png";
import "./ListUsers.scss";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import {getAvatarApi} from "../../../../api/user"

const changeStatus = () => {
    console.log("changeStatus")
}

const deleteUser = () => {
    console.log("deleteUser")
}

const UserActive = (props) => {
    const { user, updateUser } = props;
    const [avatar, setAvatar] = useState(null);
  
    useEffect(() => {
      if (user.avatar) {
        getAvatarApi(user.avatar).then(response => {
          setAvatar(response);
        });
      } else {
        setAvatar(null);
      }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button type="primary" onClick={() => updateUser(user)}>
                    <EditOutlined/>
                </Button>,
                <Button type="danger" onClick={() => changeStatus()}>
                    <StopOutlined/>
                </Button>,
                <Button type="danger" onClick={() => deleteUser()}>
                    <DeleteOutlined/>
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar}/>}
                title={`
                ${user.name ? user.name : '...'}
                ${user.lastname ? user.lastname : '...'}
                `}
                description={user.email ? user.email : '...'}
            />
        </List.Item>
    )
}

const UsersActive = (props) => {
    const {
        usersActive,
        setIsVisibleModal,
        setTitleModal,
        setContentModal,
        setReloadUsers
    } = props;

    const updateUser = (user) => {
        setIsVisibleModal(true);
        setTitleModal(`Editar ${user.name} ${user.lastname}`);
        setContentModal(<EditUserForm user={user} setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers}/>);
    }

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={usersActive}
            renderItem={user => <UserActive user={user} updateUser={updateUser}/>}
        />
    )
}

const UserInactive = (props) => {
    const { user } = props;
    const [avatar, setAvatar] = useState(null);
  
    useEffect(() => {
      if (user.avatar) {
        getAvatarApi(user.avatar).then(response => {
          setAvatar(response);
        });
      } else {
        setAvatar(null);
      }
    }, [user]);

    return (
        <List.Item
            actions={[
                <Button type="primary" onClick={() => changeStatus()}>
                    <CheckOutlined/>
                </Button>,
                <Button type="danger" onClick={() => deleteUser()}>
                    <DeleteOutlined/>
                </Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar src={avatar ? avatar : noAvatar}/>}
                title={`
                ${user.name ? user.name : '...'}
                ${user.lastname ? user.lastname : '...'}
                `}
                description={user.email ? user.email : '...'}
            />
        </List.Item>
    )
}

const UsersInactive = (props) => {
    const {usersInactive} = props;
    return (
        <List
            className="users-inactive"
            itemLayout="horizontal"
            dataSource={usersInactive}
            renderItem={user => <UserInactive user={user} />}
        />
    )
}

const ListUsers = (props) => {
    const {usersActive, usersInactive, setReloadUsers} = props;
    const [viewUsersActive, setViewUsersActive] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    return (
        <div className="list-users">
            <div className="list-users__switch">
                <Switch
                    defaultChecked
                    onChange={() => setViewUsersActive(!viewUsersActive)}
                />
                <span className="list-users__span">
                    {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
                </span>
            </div>
            {viewUsersActive
                ?
                <UsersActive usersActive={usersActive}
                             setIsVisibleModal={setIsVisibleModal}
                             setTitleModal={setTitleModal}
                             setContentModal={setContentModal}
                             setReloadUsers={setReloadUsers}
                />
                :
                <UsersInactive usersInactive={usersInactive}/>}

            <Modal
                title={titleModal ? titleModal : ""}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {contentModal ? contentModal : ""}
            </Modal>
        </div>
    )
}

export default ListUsers;