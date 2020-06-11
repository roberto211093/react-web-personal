import React, {useState} from 'react';
import {Form, Input, Button, notification} from "antd";
import {MailFilled} from '@ant-design/icons';
import "./NewsLetter.scss"
import postSuscribeApi from '../../../api/newsLetter';

const NewsLetter = () => {
    const [newsLetterData, setNewsLetterData] = useState({email: ""});
    const { Item } = Form;

    const sendData = async (e) => {
        e.preventDefault();
        const {email} = newsLetterData;
        if (!email) {
            notification["error"]({
                message: "Email es obligatorio"
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
        const result = await postSuscribeApi(email);
        if (result.code === 200) {
            notification["success"]({
                message: "Email Registrado"
            });
            setNewsLetterData({email:""});
        } else {
            notification["error"]({
                message: result
            });
        }
    }

    return (
        <div className="newsLetter">
            <h3>Newsletter</h3>
            <Form className="newsLetter-form" onSubmitCapture={e => sendData(e)}>
                <Item>
                    <Input
                        prefix={<MailFilled style={{color: "rgba(0,0,0,0.25)"}}/>}
                        className="newsLetter-form__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={newsLetterData.email}
                        onChange={e => setNewsLetterData({...newsLetterData, email: e.target.value})}
                        />
                </Item>
                <Item>
                    <Button
                        type="primary"
                        className="newsLetter-form__button"
                        htmlType="submit"
                        >
                        ¡Suscribirme!
                    </Button>
                </Item>
            </Form>
        </div>
    )
}

export default NewsLetter
