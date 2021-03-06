import React from "react";
import {Row, Col} from "antd";
import "./MainBanner.scss";

const MainBanner = () => {
    return (
        <div className="main-banner">
            <div className="main-banner__dark"/>
            <Row>
                <Col md={4} />
                <Col md={16}>
                    <h1>MERN <br/>tecnologías web y móvil.</h1>
                    <h2>
                        Desarrollador Full Stack{" "}
                        <br/>
                        Mongo, Express, React y Node.
                    </h2>
                </Col>
                <Col md={4} />
            </Row>
        </div>
    )
}

export default MainBanner
