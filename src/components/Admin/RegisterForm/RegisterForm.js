import React, {useState} from "react";
import {Form, Input, Button, Checkbox, notification} from "antd";
import {MailFilled, LockFilled} from '@ant-design/icons';
import './RegisterForm.scss';

const RegisterForm = () => {
    const {Item} = Form;
    const dataInit = {
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    };
    const [registerData, setRegisterData] = useState(dataInit);

    const changeForm = (e) => {
        if (e.target.name === "privacyPolicy") {
            setRegisterData({...registerData, [e.target.name]: e.target.checked})
        } else {
            setRegisterData({...registerData, [e.target.name]: e.target.value})
        }
    }
    const sendData = (e) => {
        e.preventDefault();
        console.log("sendData registerData: ", registerData);
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
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </Item>
            <Item>
                <Input
                    prefix={<LockFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                    className="register-form__input"
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                />
            </Item>
            <Item>
                <Checkbox
                    className="register-form__checkbox"
                    name="privacyPolicy"
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