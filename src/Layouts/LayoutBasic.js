import React from "react";
import {Route, Switch} from "react-router-dom";
import {Row, Col} from 'antd';
import "./LayoutBasic.scss";
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer";

const LayoutBasic = (props) => {
    const {routes} = props;

    const LoadRoutes = ({routes}) => {
        return (
            <Switch>
                {
                    routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            component={route.component}
                            exact={route.exact}
                        />
                    ))
                }
            </Switch>
        );
    }

    return (
        <>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <MenuTop/>
                </Col>
                <Col md={4} />
            </Row>
            <LoadRoutes routes={routes}/>
            <Footer/>
        </>
    )
}

export default LayoutBasic