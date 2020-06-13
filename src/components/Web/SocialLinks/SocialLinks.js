import React from "react";
import {ReactComponent as FacebookIcon} from "../../../assets/img/svg/facebook.svg";
import {ReactComponent as LinkedinIcon} from "../../../assets/img/svg/linkedin.svg";
import {ReactComponent as TwitterIcon} from "../../../assets/img/svg/twitter.svg";
import {GithubFilled, InstagramFilled} from '@ant-design/icons';
import "./SocialLinks.scss";

const SocialLinks = () => {
    return (
        <div className="social-links">

            <a  href="https://www.instagram.com/roberto_acosta/" 
                target="_blank" 
                className="instagram"
                rel="noopener noreferrer"
            >
                <InstagramFilled style={{color: "#FFF"}}/>
            </a>

            <a  href="https://twitter.com/Roberto211093" 
                target="_blank" 
                className="twitter"
                rel="noopener noreferrer"
            >
                <TwitterIcon/>
            </a>

            <a  href="https://www.facebook.com/Rafael.Roberto.Acosta.Martinez" 
                target="_blank" 
                className="facebook"
                rel="noopener noreferrer"
            >
                <FacebookIcon/>
            </a>

            <a  href="https://www.linkedin.com/in/rafael-acosta" 
                target="_blank" 
                className="linkedin"
                rel="noopener noreferrer"
            >
                <LinkedinIcon/>
            </a>

            <a  href="https://github.com/roberto211093" 
                target="_blank" 
                className="github"
                rel="noopener noreferrer"
            >
                <GithubFilled style={{color: "#FFF"}}/>
            </a>
        </div>
    )
}

export default SocialLinks
