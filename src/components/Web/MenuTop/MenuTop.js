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
            try {
                const res = await getMenusApi();
                // defensively check response shape before iterating
                if (res && Array.isArray(res.menus)) {
                    res.menus.forEach(item => {
                        item && item.active && arrayMenus.push(item);
                    });
                } else {
                    // If API returned unexpected shape, log for debugging
                    // but avoid crashing the UI
                    // console.warn('getMenusApi returned unexpected data', res);
                }
            } catch (err) {
                // handle network/CORS/errors gracefully in UI
                // console.error('Error fetching menus', err);
            } finally {
                setMenusData(arrayMenus);
            }
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
