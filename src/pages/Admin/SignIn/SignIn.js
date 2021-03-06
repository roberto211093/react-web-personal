import React from "react";
import {Helmet} from "react-helmet";
import {Redirect, Link} from "react-router-dom";
import {Layout, Tabs} from "antd";
import Logo from "../../../assets/img/png/rafaLogo.png";
import LoginForm from "../../../components/Admin/LoginForm";
import RegisterForm from "../../../components/Admin/RegisterForm";
import {getAccessTokenApi} from "../../../api/auth";
import "./SignIn.scss";

const SignIn = () => {
    const {Content} = Layout;
    const {TabPane} = Tabs;

    if (getAccessTokenApi()) {
        return (
            <Redirect to="/admin"/>
        )
    }

    return (
        <>
            <Helmet>
                <title>Login | Rafael Acosta Martinez</title>
            </Helmet>
            <Layout className="sign-in">
                <Content className="sign-in__content">
                    <Link to={"/"} className="sign-in__content-logo">
                        <img src={Logo} alt="Rafael Roberto Acosta Martinez"/>
                    </Link>

                    <div className="sign-in__content-tabs">
                        <Tabs type="card">
                            <TabPane tab={<span>Entrar</span>} key="1">
                                <LoginForm/>
                            </TabPane>
                            <TabPane tab={<span>Registrar</span>} key="2">
                                <RegisterForm/>
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
            </Layout>
        </>
    )
}

export default SignIn