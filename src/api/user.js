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

export const getUsersActiveApi = (token, status) => {
    const url = `${BASE_PATH}/${API_VERSION}/users-active?active=${status}`;
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

export const putUpdateAvatarApi = (token, avatar, userId) => {
    const url = `${BASE_PATH}/${API_VERSION}/update-avatar/${userId}`;
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    const params = {
        method: "PUT",
        body: formData,
        headers: {
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

export const getAvatarApi = (avatarName) => {
    const url = `${BASE_PATH}/${API_VERSION}/get-avatar/${avatarName}`;

    return fetch(url).then(response => {
        return response.url;
    })
    .catch(err => {
        return err.message;
    })
}

export const putUpdateUserApi = (token, user, userId) => {
    const url = `${BASE_PATH}/${API_VERSION}/update-user/${userId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify(user),
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

export const putActivateUserApi = (token, userId, status) => {
    const url = `${BASE_PATH}/${API_VERSION}/activate-user/${userId}`;
    const params = {
        method: "PUT",
        body: JSON.stringify({active: status}),
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