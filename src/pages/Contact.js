import React from "react";
import {Helmet} from "react-helmet";
import ContactForm from "../components/Web/ContactForm/ContactForm";

const Contact = () => {

    return (
        <>
            <Helmet>
                <title>Contacto | Rafael Acosta Martinez</title>
            </Helmet>
            <ContactForm />   
        </>
    )
}

export default Contact