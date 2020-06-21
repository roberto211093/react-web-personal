import React, {useContext, useState} from "react";
import {Form, Input, Button, notification} from "antd";
import {MailFilled, LockFilled} from '@ant-design/icons';
import {emailValidation, minLengthValidation} from "../../../utils/formValidation";
import {signInApi} from '../../../api/user';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../api/config";
import {AuthContext} from "../../../context/AuthProvider";
import jwt from "jwt-decode";
import './LoginForm.scss';

const LoginForm = () => {
    const {Item} = Form;
    const dataInit = {
        email: "",
        password: ""
    }
    const validationInit = {
        email: false,
        password: false
    };
    const [loginData, setLoginData] = useState(dataInit);
    const [formValidation, setFormValidation] = useState(validationInit);
    const {setData} = useContext(AuthContext);


    const validateField = (e) => {
        const {type, name} = e.target;
        if (type === "email") {
            setFormValidation({...formValidation, [name]: emailValidation(e.target)});
        }
        if (type === "password") {
            setFormValidation({...formValidation, [name]: minLengthValidation(e.target, 6)});
        }
    }

    const changeForm = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const resetForm = () => {
        const input = document.getElementsByName('input');
        for (let i = 0; i < input.length; i++) {
            input[i].classList.remove("success");
            input[i].classList.remove("error");
        }
        setFormValidation(validationInit);
        setLoginData(dataInit);
    }

    const sendData = async (e) => {
        e.preventDefault();
        const {email, password} = loginData;
        if (!email && !password) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
            return;
        }
        if (!email) {
            notification["error"]({
                message: "Email vacio"
            });
            return;
        }
        if (!password) {
            notification["error"]({
                message: "Password vacio"
            });
            return;
        }
        const result = await signInApi(loginData);
        if (result.accessToken) {
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            notification["success"]({
                message: "Bienvenido"
            });
            resetForm();
            setData({user: jwt(accessToken), isLoading: false });
        } else {
            notification["error"]({
                message: result
            });
        }
    }

    return (
        <Form className="login-form" onSubmitCapture={e => sendData(e)} onChange={e => changeForm(e)}>
            <Item>
                <Input
                    prefix={<MailFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="login-form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="login-form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Button
                    className="login-form__button"
                    htmlType="submit"
                >
                    Enviar
                </Button>
            </Item>
        </Form>
    )
}

export default LoginForm