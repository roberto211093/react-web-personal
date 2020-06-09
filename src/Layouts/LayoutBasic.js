import React from "react";
import {Route, Switch} from "react-router-dom";
import {Layout, Row, Col} from 'antd';
import "./LayoutBasic.scss";
import MenuTop from "../components/Web/MenuTop/MenuTop";

const LayoutBasic = (props) => {
    const {routes} = props;
    const {Footer} = Layout;

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
            <Footer>Rafael Roberto Acosta Martinez</Footer>
        </>
    )
}

export default LayoutBasic