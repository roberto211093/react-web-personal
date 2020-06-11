import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import getMenusApi from '../../../api/menu';
import ListMenuWeb from "../../../components/Admin/MenuWeb/ListMenuWeb/ListMenuWeb";

const MenuWeb = () => {
    const [menus, setMenus] = useState([]);
    const [reloadMenus, setReloadMenus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMenusApi();
            setMenus(res.menus);
        }
        fetchData();
        setReloadMenus(false)
    }, [reloadMenus])

    return (
        <>
            <Helmet>
                <title>Menu | Rafael Acosta Martinez</title>
            </Helmet>
            <div className="menu-web">
                <ListMenuWeb menus={menus} setReloadMenus={setReloadMenus}/>
            </div>
        </>
    )
}

export default MenuWeb
