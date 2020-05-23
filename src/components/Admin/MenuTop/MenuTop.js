import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import RafaLogo from '../../../assets/img/png/rafaLogo.png';
import {Button} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined} from '@ant-design/icons';
import {AuthContext} from "../../../context/AuthProvider";

import './MenuTop.scss';

const MenuTop = (props) => {
    const {menuCollapsed, setMenuCollapsed} = props;
    const {setUser, logout} = useContext(AuthContext);

    const closeSession = () => {
        logout()
        setUser({user: null, isLoading: false});
    }

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <Link to={"/admin"}>
                    <img className="menu-top__left-logo"
                         src={RafaLogo}
                         alt="Rafael Roberto Acosta Martinez"/>
                </Link>
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
                    {
                        menuCollapsed
                            ? <MenuUnfoldOutlined/>
                            : <MenuFoldOutlined/>
                    }
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={() => closeSession()}>
                    <PoweroffOutlined/>
                </Button>
            </div>
        </div>
    )
}

export default MenuTop