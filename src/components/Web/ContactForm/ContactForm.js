import React from "react";
import {Layout, Form, Input, Button, notification} from 'antd';
import "./ContactForm.scss";
import postSendMailApi from "../../../api/contact";

const validateMessages = {
  // eslint-disable-next-line 
  required: '${label} es obligatorio!',
  types: {
    // eslint-disable-next-line 
    email: '${label} invalido!',
  },
};

const ContactForm = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const result = await postSendMailApi(values.contact);
        const {message} = result;
        if (result.code === 200) {
            notification["success"]({
                message
            });
            form.resetFields();
        } else {
            notification["error"]({
                message
            });
        }
    };
      
    return (
        <>
            <Layout className="contact">
                <Layout.Content className="contact__content">
                    <Form labelCol={{span:8}} form={form} onFinish={onFinish} validateMessages={validateMessages}>
                        <h1 className="contact__content__title">Contáctame</h1>
                        <p className="contact__content__subtitle">Déja tus datos y te contactaré lo antes posible.</p>
                        <Form.Item 
                            name={['contact', 'name']}
                            label="Nombre"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                            <Input placeholder="Ej: Juanito Pérez" />
                        </Form.Item>
                        <Form.Item
                            name={['contact', 'email']}
                            label="Email"
                            rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                            ]}
                        >
                            <Input placeholder="Ej: juanito@perezmail.com" />
                        </Form.Item>
                        <Form.Item 
                            name={['contact', 'phone']} label="Telefono"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                            >
                            <Input placeholder="Ej: +56 9 12345678" />
                        </Form.Item>
                        <Form.Item 
                            name={['contact', 'message']} label="Comentario"
                            rules={[
                            {
                                required: true,
                            },
                            ]}>
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <Button className="contact__content__button" type="primary" htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </Layout.Content>
            </Layout>
        </>
    )
}

export default ContactForm;