import React, { useState } from "react";
import {Form, Input, Select, Button, Row, Col, notification} from "antd";
import {UserOutlined, MailFilled, LockFilled} from '@ant-design/icons';
import { getAccessTokenApi } from "../../../../api/auth";
import { postSignUpAdminApi } from "../../../../api/user";
import "./AddUserForm.scss"

const AddForm = (props) => {
    const {userData, setUserData, addUser} = props;
    const { Option } = Select;
    const { Item } = Form;
    return (
        <Form className="form-add" onSubmitCapture={addUser}>
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
                    Crear Usuario
                </Button>
            </Item>
        </Form>
    )
}

const AddUserForm = (props) => {
    const {setIsVisibleModal, setReloadUsers} = props;
    const [userData, setUserData] = useState({});

    const addUser = async (e) => {
        try {
            e.preventDefault();
            const token = getAccessTokenApi();
            let userUpdate = userData;
            let {name, lastname, email, role, password, repeatPassword} = userUpdate;
            if (!name || !lastname || !email || !role || !password || !repeatPassword) {
                notification["error"]({
                    message: "Todos los campos son obligatorios"
                });
                return;
            }
            if (email) {
                // eslint-disable-next-line
                let emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                let resultValidation = emailValid.test(email)
                if (!resultValidation) {
                    notification["error"]({
                        message: "Email invalido"
                    });
                    return;
                }
            }
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
            }
            const result = await postSignUpAdminApi(token, userUpdate);
            if (result.user) {
                notification["success"]({
                    message: "Usuario Creado"
                });
                setUserData({});
                setIsVisibleModal(false);
                setReloadUsers(true);
            } else {
                notification["error"]({
                    message: result
                });
            }
        }
        catch (error) {
            notification["error"]({
                message: error
            });
        }
    }

    return (
        <div className="add-user-form">
            <AddForm
                userData={userData}
                setUserData={setUserData}
                addUser={addUser}
            />
        </div>
    )
}

export default AddUserForm
