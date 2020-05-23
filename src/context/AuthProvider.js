import React, {createContext, useEffect, useState, useCallback} from "react";
import {getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout} from "../api/auth";
import jwt from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const dataInit = {user: null, isLoading: true};
    const [user, setUser] = useState(dataInit);

    const checkUserLogin = useCallback(async () => {
        try {
            const accessToken = await getAccessTokenApi();
            console.log("checkUserLogin: ", accessToken);
            if (!accessToken) {
                const refreshToken = await getRefreshTokenApi(accessToken);
                if (!refreshToken) {
                    logout()
                    setUser({user: null, isLoading: false});
                } else {
                    const refreshAccess = await refreshAccessTokenApi();
                    console.log("refreshAccess:", refreshAccess);
                }
            } else {
                setUser({user: jwt(accessToken), isLoading: false});
            }

        } catch (e) {
            console.log("error al detectar usuario")
            console.log(e)
        }
    }, [setUser]);

    useEffect(() => {
        checkUserLogin();
    }, [checkUserLogin]);

    return (
        <AuthContext.Provider value={
            {
                user,
                setUser,
                logout,
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider