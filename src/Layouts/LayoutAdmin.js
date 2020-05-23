import React, {useState, useContext} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Layout} from 'antd';
import "./LayoutAdmin.scss";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import {AuthContext} from "../context/AuthProvider";

const LayoutAdmin = (props) => {
    const {routes} = props;
    const {Header, Footer, Content} = Layout;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const {data} = useContext(AuthContext);
    const {user, isLoading} = data;

    const LoadRoutes = ({routes}) => {
        // console.log('routes: ', routes);
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
            {user === null && !isLoading
                ?
                <>
                    <Route path="/admin/login" component={AdminSignIn}/>
                    <Redirect to="/admin/login"/>
                </>
                :
                <Layout>
                    <MenuSider menuCollapsed={menuCollapsed}/>
                    <Layout
                        className="layout-admin"
                        style={{marginLeft: menuCollapsed ? "80px" : "200px"}}
                    >
                        <Header className="layout-admin__header">
                            <MenuTop
                                menuCollapsed={menuCollapsed}
                                setMenuCollapsed={setMenuCollapsed}
                            />
                        </Header>
                        <Content className="layout-admin__content">
                            <LoadRoutes routes={routes}/>
                        </Content>
                        <Footer className="layout-admin__footer">Rafael Roberto Acosta Martinez</Footer>
                    </Layout>
                </Layout>
            }
        </>
    )
}

export default LayoutAdmin