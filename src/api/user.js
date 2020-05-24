import {BASE_PATH, API_VERSION} from "./config";

const signUpApi = (data) => {
    const url = `${BASE_PATH}/${API_VERSION}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    })
        .then(result => {
            if (result.user) {
                return result;
            }
            return result.message
        })
        .catch(err => {
            return err.message;
        })
}


export const signInApi = (data) => {
    const url = `${BASE_PATH}/${API_VERSION}/sign-in`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    })
        .then(result => {
            if (result.accessToken) {
                return result;
            }
            return result.message
        })
        .catch(err => {
            return err.message;
        })
}

export const getUsersApi = (token) => {
    const url = `${BASE_PATH}/${API_VERSION}/users`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };

    return fetch(url, params).then(response => {
        return response.json();
    })
        .then(result => {
            if (result.message) {
                return result.message;
            }
            return result;
        })
        .catch(err => {
            return err.message;
        })
}

export default signUpApi