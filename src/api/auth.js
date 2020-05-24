import {BASE_PATH, API_VERSION, ACCESS_TOKEN, REFRESH_TOKEN} from "./config";
import jwtDecode from "jwt-decode";

const willExpiredToken = (token) => {
    const seconds = 60;
    const metaToken = jwtDecode(token)
    const {exp} = metaToken;
    const now = (Date.now() + seconds) / 1000; // entre 1000 para pasarlo a una fecha unix
    //Si now mayor o igual a exp significa que el token a caducado y devolvera true
    return now >= exp;
}

export const getRefreshTokenApi = () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
        return null
    }
    return willExpiredToken(refreshToken) ? null : refreshToken
}

export const getAccessTokenApi = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
        return null;
    }
    return willExpiredToken(accessToken) ? null : accessToken;
}

export const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

export const refreshAccessTokenApi = (refreshToken) => {
    const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;
    const bodyData = {
        refreshToken: refreshToken
    }
    const params = {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        if (response.status !== 200) {
            return null;
        } else {
            return response.json()
        }
    })
        .then(result => {
            if (result.message) {
                logout();
                return result.message;
            }
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken);
            return result;
        })
        .catch(err => {
            return err.message;
        })
}