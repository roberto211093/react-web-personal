import React, {createContext, useEffect, useState, useCallback} from "react";
import {getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout} from "../api/auth";
import jwt from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const dataInit = {user: null, isLoading: true};
    const [data, setData] = useState(dataInit);

    const checkUserLogin = useCallback(async () => {
        try {
            const accessToken = await getAccessTokenApi();
            if (!accessToken) {
                const refreshToken = await getRefreshTokenApi();
                if (!refreshToken) {
                    logout()
                    setData({user: null, isLoading: false});
                } else {
                    const refreshAccess = await refreshAccessTokenApi(refreshToken);
                    console.log("refreshAccess:", refreshAccess);
                }
            } else {
                setData({user: jwt(accessToken), isLoading: false});
            }

        } catch (e) {
            console.log("error al detectar usuario", e);
        }
    }, [setData]);

    useEffect(() => {
        checkUserLogin();
    }, [checkUserLogin]);

    return (
        <AuthContext.Provider value={
            {
                data,
                setData
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider