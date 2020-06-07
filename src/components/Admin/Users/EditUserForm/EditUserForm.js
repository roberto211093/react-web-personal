import React, {useCallback, useState, useEffect} from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from "antd";
import {UserOutlined, MailFilled, LockFilled} from '@ant-design/icons';
import {useDropzone} from "react-dropzone"
import noAvatar from "../../../../assets/img/png/no-avatar.png";
import "./EditUserForm.scss";
import { getAvatarApi, putUpdateAvatarApi, putUpdateUserApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

const UploadAvatar = (props) =>{
    const {userData, setUserData} = props;
    const {avatar} = userData;

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setUserData({...userData, avatar:{ file, preview: URL.createObjectURL(file)}});
    }, [setUserData, userData]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/png, image/jpg, image/jpeg",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ?
                <Avatar size={150} src={noAvatar}/>
            :
                <Avatar size={150} src={avatar ? (avatar.preview ? avatar.preview : avatar) : noAvatar}/>
            }
        </div>
    )
}

const EditForm = (props) => {
    const { userData, setUserData, updateUser} = props;
    const { Option } = Select;
    const { Item } = Form;

    return (
        <Form className="form-edit" onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Item>
                        <Input
                            prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({...userData, name:e.target.value})}
                        />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item>
                        <Input
                            prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={e => setUserData({...userData, lastname:e.target.value})}
                        />
                    </Item>
                </Col>
            </Row>
            
            <Row gutter={24}>
                <Col span={12}>
                    <Item>
                        <Input
                            prefix={<MailFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                            placeholder="Email"
                            value={userData.email}
                            onChange={e => setUserData({...userData, email:e.target.value})}
                        />
                    </Item>
                </Col>
                <Col span={12}>
                    <Select
                        placeholder="Selecciona un rol"
                        onChange={e => setUserData({...userData, role: e })}
                        value={userData.role}
                        style={{width: "100%"}}
                    >
                        <Option value="admin">Administrador</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="reviewer">Revisor</Option>
                    </Select>
                </Col>
            </Row>
            
            <Row gutter={24}>
                <Col span={12}>
                    <Item>
                        <Input
                            prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                            type="password"
                            placeholder="Contraseña"
                            value={userData.password}
                            onChange={e => setUserData({...userData, password:e.target.value})}
                        />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item>
                        <Input
                            prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                            type="password"
                            placeholder="Repetir contraseña"
                            value={userData.repeatPassword}
                            onChange={e => setUserData({...userData, repeatPassword:e.target.value})}
                        />
                    </Item>
                </Col>
            </Row>
            
            <Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar Usuario
                </Button>
            </Item>
        </Form>
    );
} 

const EditUserForm = (props) => {
    const {user, setIsVisibleModal, setReloadUsers} = props;
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then( res => {
                setUserData({
                    name: user.name ? user.name : "",
                    lastname: user.lastname ? user.lastname : "",
                    email: user.email ? user.email : "",
                    role: user.role ? user.role : "",
                    avatar: res
                });
            });
        } else {
            setUserData({
                name: user.name ? user.name : "",
                lastname: user.lastname ? user.lastname : "",
                email: user.email ? user.email : "",
                role: user.role ? user.role : "",
                avatar: null
            });
        }
    }, [user])

    const updateUser = async (e) => {
        e.preventDefault();
        const token = getAccessTokenApi();
        let userUpdate = userData;
        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                notification["error"]({
                    message: "Contraseña no coincide"
                });
                return;
            }
            if (userUpdate.password.length < 6) {
                notification["error"]({
                    message: "Contraseña debe contener al menos 6 caracteres"
                });
                return;
            } else {
                delete userUpdate.repeatPassword;
            }
        }
        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification["error"]({
                message: "Nombre, Apellido y Email son campos obligatorios"
            });
            return;
        }
        if (typeof userUpdate.avatar === "object") {
            const res = await putUpdateAvatarApi(token, userUpdate.avatar.file, user._id);
            userUpdate.avatar = res.user.avatar;
        } else {
            userUpdate.avatar = user.avatar;
        }
        const result = await putUpdateUserApi(token, userUpdate, user._id);
        if (result.user) {
            notification["success"]({
                message: "Usuario Modificado"
            });
            setIsVisibleModal(false);
            setReloadUsers(true);
        } else {
            notification["error"]({
                message: result
            });
        }
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar userData={userData} setUserData={setUserData} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    )
}
export default EditUserForm;