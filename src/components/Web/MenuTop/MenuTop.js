import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import getMenusApi from "../../../api/menu";
import RafaLogo from '../../../assets/img/png/rafaLogo.png';
import "./MenuTop.scss";
import SocialLinks from "../SocialLinks/SocialLinks";

const MenuTop = () => {
    const {Item} = Menu;
    const [menusData, setMenusData] = useState([]);

    useEffect(() => {
        const arrayMenus = [];
        const fetchData = async () => {
            const res = await getMenusApi();
            res.menus.forEach(item => {
                item.active && arrayMenus.push(item);
            });
            setMenusData(arrayMenus);
        };
        fetchData();
    },[]);

    return (
        <Menu className="web-menu-top" mode="horizontal">
            <Item className="web-menu-top__logo">
                <Link to={"/"}>
                    <img className="web-menu-top__left-logo"
                        src={RafaLogo}
                        alt="Rafael Roberto Acosta Martinez"
                    />
                </Link>
            </Item>
            {
                menusData.length > 0 ?
                    menusData.map(item => {
                        let external = item.url.indexOf("http") > -1 ? true : false;
                        return(
                            external ? 
                                <Item key={item._id} className="web-menu-top__item">
                                    <a  href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    > 
                                        {item.title}
                                    </a>
                                </Item>
                                : 
                                <Item key={item._id} className="web-menu-top__item">
                                    <Link to={item.url}>{item.title}</Link>
                                </Item>
                        )
                    })
                : null
            }
            <SocialLinks/> 
        </Menu>
    )
}

export default MenuTop
