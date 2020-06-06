import React, {useCallback, useState} from "react";
import {Avatar, Form, Input, Select, Button, Row, Col, notification} from "antd";
import {UserOutlined, MailFilled, LockFilled} from '@ant-design/icons';
import {useDropzone} from "react-dropzone"
import noAvatar from "../../../../assets/img/png/no-avatar.png";
import "./EditUserForm.scss";

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
                            defaultValue={userData.name}
                            onChange={e => setUserData({...userData, name:e.target.value})}
                        />
                    </Item>
                </Col>
                <Col span={12}>
                    <Item>
                        <Input
                            prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                            placeholder="Apellido"
                            defaultValue={userData.lastname}
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
                            defaultValue={userData.email}
                            onChange={e => setUserData({...userData, email:e.target.value})}
                        />
                    </Item>
                </Col>
                <Col span={12}>
                    <Select
                        placeholder="Selecciona un rol"
                        onChange={e => setUserData({...userData, role: e })}
                        defaultValue={userData.role}
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
    const {user} = props;
    const [userData, setUserData] = useState({
        name: user.name ? user.name : "",
        lastname: user.lastname ? user.lastname : "",
        email: user.email ? user.email : "",
        role: user.role ? user.role : "",
        avatar: user.avatar ? user.avatar : null
    });

    const updateUser = (e) => {
        e.preventDefault();
        console.log(userData);
    }

    return (
        <div className="edit-user-form">
            <UploadAvatar userData={userData} setUserData={setUserData} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser}/>
        </div>
    )
}
export default EditUserForm;