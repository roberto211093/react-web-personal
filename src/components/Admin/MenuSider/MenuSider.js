import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeFilled, LoginOutlined} from '@ant-design/icons';

import './MenuSider.scss';

const MenuSider = (props) => {
    const {Sider} = Layout;
    const {Item} = Menu;
    const {menuCollapsed} = props;

    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                <Item key="1">
                    <Link to={"/admin"}>
                        <HomeFilled/>
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>
                <Item key="2">
                    <Link to={"/admin/login"}>
                        <LoginOutlined/>
                        <span className="nav-text">Sign In</span>
                    </Link>
                </Item>
            </Menu>
        </Sider>
    )
}

export default MenuSider