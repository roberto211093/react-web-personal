import React, {useState, useEffect} from "react";
import {Switch, List, Button, Modal as ModalAntd, notification} from "antd";
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Modal from '../../../Modal'
import DragSortableList from 'react-drag-sortable';
import "./ListMenuWeb.scss";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteMenuApi, updateMenuApi, ActivateMenuApi } from "../../../../api/menu";
import AddMenuWebForm from "../AddMenuWebForm/AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";

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
    const {
        menuItem, 
        setReloadMenus, 
        setIsVisibleModal,
        setTitleModal,
        setContentModal
    } = props;

    const updateMenu = () => {
        setIsVisibleModal(true);
        setTitleModal(`Editando menú: ${menuItem.title}`);
        setContentModal(
            <EditMenuWebForm 
                menu={menuItem} 
                setIsVisibleModal={setIsVisibleModal} 
                setReloadMenus={setReloadMenus}
            />
        );
    }

    return (
        <List.Item actions={[
            <Switch defaultChecked={menuItem.active} onClick={() => changeStatus(menuItem, setReloadMenus)}/>,
            <Button type="primary" onClick={() => updateMenu()}>
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
                content: (
                    <MenuItem 
                        menuItem={item} 
                        setReloadMenus={setReloadMenus}
                        setIsVisibleModal={setIsVisibleModal}
                        setTitleModal={setTitleModal}
                        setContentModal={setContentModal}
                    />
                )
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

    const addMenuWebModal = () => {
        setIsVisibleModal(true);
        setTitleModal("Creando nuevo menú");
        setContentModal(
            <AddMenuWebForm 
                setIsVisibleModal={setIsVisibleModal} 
                setReloadMenus={setReloadMenus} 
                order={menus.length}
            />
        )
    }

    return (
        <div className="menu-web-list">
            <div className="menu-web-list__header">
                <Button type="primary" onClick={() => addMenuWebModal()}>Nuevo Menú</Button>
            </div>
            <div className="menu-web-list__items">
                <DragSortableList items={listItems} onSort={onSort} type="vertical"/>
            </div>
            <Modal
                title={titleModal}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {contentModal}
            </Modal>
        </div>
    )
}

export default ListMenuWeb
