import React from "react";
import {Helmet} from "react-helmet";
import MainBanner from "../components/Web/MainBanner";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Rafael Acosta Martinez</title>
            </Helmet>
            <MainBanner/>
        </>
    )
}

export default Home