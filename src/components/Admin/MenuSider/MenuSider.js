import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import {HomeFilled, UserOutlined, MenuOutlined} from '@ant-design/icons';

import './MenuSider.scss';

const MenuSider = (props) => {
    const {Sider} = Layout;
    const {Item} = Menu;
    const {menuCollapsed, location} = props;
    const {pathname} = location;

    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
                <Item key={"/admin"}>
                    <Link to={"/admin"}>
                        <HomeFilled/>
                        <span className="nav-text">Home</span>
                    </Link>
                </Item>
                <Item key={"/admin/users"}>
                    <Link to={"/admin/users"}>
                        <UserOutlined/>
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Item>
                <Item key={"/admin/web"}>
                    <Link to={"/admin/web"}>
                        <MenuOutlined/>
                        <span className="nav-text">Menú Web</span>
                    </Link>
                </Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);