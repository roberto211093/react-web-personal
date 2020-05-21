import React from "react";
import {Route, Switch} from "react-router-dom";
import {Layout} from 'antd';
import "./LayoutBasic.scss";

const LayoutBasic = (props) => {
    const {routes} = props;
    const {Header, Footer, Sider, Content} = Layout;

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
        <Layout>
            <Sider>
                <h2>Menu Sider Basic</h2>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <LoadRoutes routes={routes}/>
                </Content>
                <Footer>Rafael Roberto Acosta Martinez</Footer>
            </Layout>
        </Layout>
    )
}

export default LayoutBasic