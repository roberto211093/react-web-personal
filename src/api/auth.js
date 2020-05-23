import {BASE_PATH, API_VERSION, ACCESS_TOKEN, REFRESH_TOKEN} from "./config";
import jwtDecode from "jwt-decode";

const willExpiredToken = (token) => {
    const seconds = 60;
    const metaToken= jwtDecode(token)
    const {exp} = metaToken;
    console.log(exp)
    const now = (Date.now() + seconds) / 1000; // entre 1000 para pasarlo a una fecha unix
    console.log(now)
    //Si now mayor o igual a exp significa que el token a caducado y devolvera true
    console.log(now >= exp)
    return now >= exp;
}

export const getRefreshToken = () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if(!refreshToken) {
        return null
    }
    return willExpiredToken(refreshToken) ? null : refreshToken
}

export const getAccessToken = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
        return null;
    }
    return willExpiredToken(accessToken) ? null : accessToken;
}