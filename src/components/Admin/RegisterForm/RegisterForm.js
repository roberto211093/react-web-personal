import React, {useState} from "react";
import {Form, Input, Button, Checkbox, notification} from "antd";
import {UserOutlined, MailFilled, LockFilled} from '@ant-design/icons';
import {emailValidation, minLengthValidation} from "../../../utils/formValidation";
import signUpApi from '../../../api/user';
import './RegisterForm.scss';

const RegisterForm = () => {
    const {Item} = Form;
    const dataInit = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    };
    const validationInit = {
        name: false,
        lastname: false,
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    };
    const [registerData, setRegisterData] = useState(dataInit);
    const [formValidation, setFormValidation] = useState(validationInit);

    const validateField = (e) => {
        const {type, name} = e.target;
        if (type === "text") {
            setFormValidation({...formValidation, [name]: minLengthValidation(e.target, 3)});
        }
        if (type === "email") {
            setFormValidation({...formValidation, [name]: emailValidation(e.target)});
        }
        if (type === "password") {
            setFormValidation({...formValidation, [name]: minLengthValidation(e.target, 6)});
        }
        if (type === "checkbox") {
            setFormValidation({...formValidation, [name]: e.target.checked});
        }
    }

    const changeForm = (e) => {
        if (e.target.name === "privacyPolicy") {
            setRegisterData({...registerData, [e.target.name]: e.target.checked})
        } else {
            setRegisterData({...registerData, [e.target.name]: e.target.value})
        }
    }

    const resetForm = () => {
        const input = document.getElementsByName('input');
        for (let i = 0; i < input.length; i++) {
            input[i].classList.remove("success");
            input[i].classList.remove("error");
        }
        setFormValidation(validationInit);
        setRegisterData(dataInit);
    }

    const sendData = async (e) => {
        e.preventDefault();
        const {name, lastname, email, password, repeatPassword, privacyPolicy} = registerData;
        if (!name || !lastname || !email || !password || !repeatPassword || !privacyPolicy) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
            return;
        }
        if (password !== repeatPassword) {
            notification["error"]({
                message: "Contraseña no coincide"
            });
            return;
        }
        const result = await signUpApi(registerData);
        if (result.user) {
            notification["success"]({
                message: "Usuario Registrado"
            });
            resetForm();
        } else {
            notification["error"]({
                message: result
            });
        }
    }

    return (
        <Form className="register-form" onSubmitCapture={e => sendData(e)} onChange={e => changeForm(e)}>
            <Item>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={registerData.name}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="text"
                    name="lastname"
                    placeholder="Apellido"
                    value={registerData.lastname}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Input
                    prefix={<MailFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    value={registerData.repeatPassword}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Checkbox
                    className="register-form__checkbox"
                    name="privacyPolicy"
                    checked={registerData.privacyPolicy}
                    onChange={e => validateField(e)}
                >
                    He leído y acepto la política de privacidad.
                </Checkbox>
            </Item>
            <Item>
                <Button
                    className="register-form__button"
                    htmlType="submit"
                >
                    Crear Cuenta
                </Button>
            </Item>
        </Form>
    )
}

export default RegisterForm