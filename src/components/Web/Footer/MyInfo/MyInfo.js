import React from 'react'
import SocialLinks from '../../SocialLinks';
import Logo from "../../../../assets/img/png/rafaLogo.png"
import "./MyInfo.scss";

const MyInfo = () => {
    return (
        <div className="my-info">
            <img src={Logo} alt="Rafael Acosta Martinez"/>
            <h4>Entra en el mundo del desarrollo web, disfruta creando proyectos de todo tipo, deja que tú imaginación fluya y crea verdaderas maravillas!!!</h4>
            <SocialLinks/>
        </div>
    )
}

export default MyInfo
