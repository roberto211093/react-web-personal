import React, { useState, useEffect } from "react";
import {Form, Input, Select, Button, Row, Col, notification} from "antd";
import {FontSizeOutlined} from '@ant-design/icons';
import "./EditMenuWebForm.scss";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

const EditForm = (props) => {
    const {menuData, setMenuData, editMenu} = props;
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
        <Form className="form-edit" onSubmitCapture={editMenu}>
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
                    Actualizar Menú
                </Button>
            </Item>
        </Form>
    )
}

const EditMenuWebForm = (props) => {
    const {menu, setIsVisibleModal, setReloadMenus} = props;
    const [menuData, setMenuData] = useState({});

    useEffect(() => {
        setMenuData({
            title: menu.title ? menu.title : "",
            url: menu.url ? menu.url.split('://')[1] : "",
            protocolo: `${menu.url.split('://')[0]}://`
        });
    }, [menu]);

    const editMenu = async (e) => {
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
            let editMenu = {
                title: title,
                url: protocolo+url
            }
            const result = await updateMenuApi(token, menu._id, editMenu);
            if (result.menu) {
                notification["success"]({
                    message: "Menú Actualizado"
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
        <div className="edit-menu-web-form">
        <EditForm
            menuData={menuData}
            setMenuData={setMenuData}
            editMenu={editMenu}
        />
    </div>
    )
}

export default EditMenuWebForm
