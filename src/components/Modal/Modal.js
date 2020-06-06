import React from "react";
import {Modal as ModalAntd} from "antd";

const Modal = (props) => {
    const {children, title, isVisible, setIsVisible} = props;
    return (
        <ModalAntd
            title={title}
            visible={isVisible}
            onCancel={() => setIsVisible(!isVisible)}
            footer={false}
            centered
        >
            {children}
        </ModalAntd>
    )
}

export default Modal