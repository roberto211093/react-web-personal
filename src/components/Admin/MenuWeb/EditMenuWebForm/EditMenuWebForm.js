import React, { useState, useEffect } from "react";
import {Form, Input, Button, Row, Col, notification} from "antd";
import {FontSizeOutlined, LinkOutlined} from '@ant-design/icons';
import "./EditMenuWebForm.scss";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

const EditForm = (props) => {
    const {menuData, setMenuData, editMenu} = props;
    const { Item } = Form;

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
                            prefix={<LinkOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
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
            url: menu.url ? menu.url : ""
        });
    }, [menu]);

    const editMenu = async (e) => {
        try {
            e.preventDefault();
            const token = getAccessTokenApi();
            const {title, url} = menuData;
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
            const result = await updateMenuApi(token, menu._id, menuData);
            if (result.menu) {
                notification["success"]({
                    message: "Menú Actualizado"
                });
                setMenuData({});
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
