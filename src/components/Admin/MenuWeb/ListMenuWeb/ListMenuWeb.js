import React, {useState, useEffect} from "react";
import {Switch, List, Button, Modal as ModalAntd, notification} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Modal from '../../../Modal'
import DragSortableList from 'react-drag-sortable';
import "./ListMenuWeb.scss";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteMenuApi, updateMenuApi, ActivateMenuApi } from "../../../../api/menu";

const changeStatus = async (item, setReloadMenus) => {
    const token = getAccessTokenApi();
    try {
        const res = await ActivateMenuApi(token, item._id, !item.active)
        notification["success"]({
            message: `Menú ${res.menu.active ? "Activado" : "Desactivado"}`
        });
        setReloadMenus(true);
    }
    catch (error) {
        notification["error"]({
            message: error
        });
    }
}

const updateMenu = (item, setReloadMenus) => {
    console.log("updateMenu", item);
}

const deleteMenu = (item, setReloadMenus) => {
    const token = getAccessTokenApi();
    const fetchDelete = async () => {
        try {
            const res = await deleteMenuApi(token, item._id);
            notification["success"]({
                message: `${res.menu ? "Menu Eliminado" : res}`
            });
            setReloadMenus(true);
        }
        catch (error) {
            notification["error"]({
                message: error
            });
        }
    }
    ModalAntd.confirm({
        title: "Eliminando menu",
        content: `¿Estas seguro que quieres eliminar el menu "${item.title}"?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk () {
            fetchDelete();
        }
    });  
}

const MenuItem = (props) => {
    const {menuItem, setReloadMenus} = props;

    return (
        <List.Item actions={[
            <Switch defaultChecked={menuItem.active} onClick={() => changeStatus(menuItem, setReloadMenus)}/>,
            <Button type="primary" onClick={() => updateMenu(menuItem, setReloadMenus)}>
                <EditOutlined/>
            </Button>,
            <Button type="danger" onClick={() => deleteMenu(menuItem, setReloadMenus)}>
                <DeleteOutlined/>
            </Button>
        ]}>
            <List.Item.Meta title={menuItem.title} description={menuItem.url}/>
        </List.Item>
    )
}

const ListMenuWeb = (props) => {
    const {menus, setReloadMenus} = props
    const [listItems, setListItems] = useState([]);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);

    useEffect(() => {
        const listItemsArray = [];
        menus.forEach(item => {
            listItemsArray.push({
                content: (<MenuItem menuItem={item} setReloadMenus={setReloadMenus}/>)
            });
        });
        setListItems(listItemsArray);
    }, [menus, setReloadMenus])

    const onSort = (sortedList, dropEvent) => {
        const token = getAccessTokenApi();
        sortedList.forEach(async (item) => {
            const {_id} = item.content.props.menuItem
            const order = item.rank + 1;
            await updateMenuApi(token, _id, {order})
        })
        console.log("sortedList", sortedList);
        console.log("dropEvent", dropEvent);
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary">Nuevo Menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
        </div>
    )
}

export default ListMenuWeb
