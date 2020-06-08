import {BASE_PATH, API_VERSION} from "./config";

const getMenusApi = async () => {
    const url = `${BASE_PATH}/${API_VERSION}/get-menus`;
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        let response = await fetch(url, params);
        let result = await response.json();
        if (result.message) {
            return result.message;
        }
        return result;
    }
    catch(err) {
        return err.message;
    }
}

export const updateMenuApi = async (token, idMenu, data) => {
    const url = `${BASE_PATH}/${API_VERSION}/update-menu/${idMenu}`;
    const params = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    try {
        let response = await fetch(url, params);
        let result = await response.json();
        if (result.message) {
            return result.message;
        }
        return result;
    }
    catch(err) {
        return err.message;
    }
}

export const deleteMenuApi = async (token, idMenu) => {
    const url = `${BASE_PATH}/${API_VERSION}/delete-menu/${idMenu}`;
    const params = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    };
    try {
        let response = await fetch(url, params);
        let result = await response.json();
        if (result.message) {
            return result.message;
        }
        return result;
    }
    catch(err) {
        return err.message;
    }

}

export default getMenusApi;