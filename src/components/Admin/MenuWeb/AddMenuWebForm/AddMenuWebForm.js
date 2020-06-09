import React, { useState } from "react";
import {Form, Input, Select, Button, Row, Col, notification} from "antd";
import {FontSizeOutlined} from '@ant-design/icons';
import "./AddMenuWebForm.scss";
import { postAddMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

const AddForm = (props) => {
    const {menuData, setMenuData, addMenu} = props;
    const { Option } = Select;
    const { Item } = Form;

    const selectBefore = (
        <Select
            onChange={e => setMenuData({...menuData, protocolo: e })}
            value={menuData.protocolo}
            style={{width: "90px"}}
        >
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    )
    return (
        <Form className="form-add" onSubmitCapture={addMenu}>
            <Row gutter={24}>
                <Col span={24}>
                    <Item>
                        <Input
                            prefix={<FontSizeOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                            placeholder="Titulo"
                            value={menuData.title}
                            onChange={e => setMenuData({...menuData, title:e.target.value})}
                        />
                    </Item>
                </Col>
                <Col span={24}>
                    <Item>
                        <Input 
                            addonBefore={selectBefore}
                            placeholder="URL"
                            value={menuData.url}
                            onChange={e => setMenuData({...menuData, url:e.target.value})}
                        />
                    </Item>
                </Col>
            </Row>
            
            <Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Menú
                </Button>
            </Item>
        </Form>
    )
}

const AddMenuWebForm = (props) => {
    const {setIsVisibleModal, setReloadMenus, order} = props;
    const [menuData, setMenuData] = useState({protocolo: "http://"});

    const addMenu = async (e) => {
        try {
            e.preventDefault();
            const token = getAccessTokenApi();
            const {title, url, protocolo} = menuData;
            if (!title && !url) {
                notification["error"]({
                    message: "Todos los campos son obligatorios"
                });
                return;
            }
            if (!title) {
                notification["error"]({
                    message: "Titulo es obligatorio"
                });
                return;
            }
            if (!url) {
                notification["error"]({
                    message: "Url es obligatorio"
                });
                return;
            }
            let addMenu = {
                title: title,
                url: protocolo+url,
                order: order + 1,
                active: true
            }
            const result = await postAddMenuApi(token, addMenu);
            if (result.menu) {
                notification["success"]({
                    message: "Usuario Creado"
                });
                setMenuData({protocolo: "http://"});
                setIsVisibleModal(false);
                setReloadMenus(true);
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
        <div className="add-menu-web-form">
        <AddForm
            menuData={menuData}
            setMenuData={setMenuData}
            addMenu={addMenu}
        />
    </div>
    )
}

export default AddMenuWebForm
