import React, {useState} from "react";
import {Form, Input, Button, Checkbox, notification} from "antd";
import {MailFilled, LockFilled} from '@ant-design/icons';
import {emailValidation, minLengthValidation} from "../../../utils/formValidation";
import './RegisterForm.scss';

const RegisterForm = () => {
    const {Item} = Form;
    const dataInit = {
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    };
    const validationInit = {
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    };
    const [registerData, setRegisterData] = useState(dataInit);
    const [formValidation, setFormValidation] = useState(validationInit);

    const validateField = (e) => {
        const {type, name} = e.target;
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
    const sendData = (e) => {
        e.preventDefault();
        // eslint-disable-next-line
        const {email, password, repeatPassword, privacyPolicy} = formValidation;
        const mail = registerData.email;
        const pass = registerData.password;
        const repeatPass = registerData.repeatPassword;
        const pp = registerData.privacyPolicy;
        if (!mail || !pass || !repeatPass || !pp) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            });
            return;
        }
        if (pass !== repeatPass) {
            notification["error"]({
                message: "Contraseña no coincide"
            });
            return;
        }
        setFormValidation(validationInit)
        setRegisterData(dataInit)
        notification["success"]({
            message: "Usuario Registrado"
        });
    }

    return (
        <Form className="register-form" onSubmitCapture={e => sendData(e)} onChange={e => changeForm(e)}>
            <Item>
                <Input
                    prefix={<MailFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
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
                    onChange={e => validateField(e)}
                />
            </Item>
            <Item>
                <Checkbox
                    className="register-form__checkbox"
                    name="privacyPolicy"
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