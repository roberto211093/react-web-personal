import React from 'react';
import {Row, Col} from "antd";
import {
    LinkOutlined, 
    CodeOutlined, 
    DatabaseOutlined,
    HddOutlined,
    AppstoreOutlined,
    UserOutlined
} from '@ant-design/icons';
import "./NavFooter.scss"

const RenderListLeft = () =>{
    return (
        <ul>
            <li>
                <a  href="https://drive.google.com/drive/folders/1jeCp9WDBl8LDAgpd3ba3rpq1vTAU6gDP" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <LinkOutlined/>
                    Certificados
                </a>
            </li>

            <li>
                <a  href="https://drive.google.com/drive/folders/1jeCp9WDBl8LDAgpd3ba3rpq1vTAU6gDP" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <CodeOutlined/>
                    Desarrollo Web
                </a>
            </li>

            <li>
                <a  href="https://www.mongodb.com/"
                    target="_blank"  
                    rel="noopener noreferrer"
                >
                    <DatabaseOutlined/>
                    Base de Datos
                </a>
            </li>
        </ul>
    )
}

const RenderListRight = () =>{
    return (
        <ul>
            <li>
                <a  href="https://drive.google.com/drive/folders/1jeCp9WDBl8LDAgpd3ba3rpq1vTAU6gDP" 
                    target="_blank"  
                    rel="noopener noreferrer"
                >
                    <HddOutlined/>
                    Sistemas
                </a>
            </li>

            <li>
                <a  href="https://drive.google.com/drive/folders/1jeCp9WDBl8LDAgpd3ba3rpq1vTAU6gDP"
                    target="_blank"  
                    rel="noopener noreferrer"
                >
                    <AppstoreOutlined/>
                    CMS
                </a>
            </li>

            <li>
                <a  href="https://drive.google.com/drive/folders/1jeCp9WDBl8LDAgpd3ba3rpq1vTAU6gDP"
                    target="_blank"  
                    rel="noopener noreferrer"
                >
                    <UserOutlined/>
                    Portafolio
                </a>
            </li>
        </ul>
    )
}

const NavFooter = () => {
    return (
        <Row className="nav-footer">
            <Col md={24}>
                <h3>Navegación</h3>
            </Col>
            <Col md={12}>
                <RenderListLeft/>
            </Col>
            <Col md={12}>
                <RenderListRight/>
            </Col>
        </Row>
    )
}

export default NavFooter
