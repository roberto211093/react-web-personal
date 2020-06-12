import React from 'react';
import {Layout, Row, Col} from "antd";
import MyInfo from './MyInfo';
import NavFooter from './NavFooter';
import NewsLetter from '../NewsLetter';
import "./Footer.scss";

const Footer = () => {
    const {Footer} = Layout
    return (
        <Footer className="footer">
            <Row>
                <Col md={4}/>
                <Col md={16}>
                    <Row>
                        <Col md={8}>
                            <MyInfo/>
                        </Col>
                        <Col md={8}>
                            <NavFooter/>
                        </Col>
                        <Col md={8}>
                            <NewsLetter/>
                        </Col>
                    </Row>
                    <Row className="footer__copyright">
                        <Col md={12}>
                            © 2020 ALL RIGHTS RESERVED
                        </Col>
                        <Col md={12}>
                            RAFAEL ACOSTA MARTINEZ | DESARROLLADOR WEB
                        </Col>
                    </Row>
                </Col>
                <Col md={4}/>
            </Row>
        </Footer>
    )
}

export default Footer
