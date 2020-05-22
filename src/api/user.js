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
        }).then(result => {
            if (result.user) {
                return result;
            }
            return result.message
        })
        .catch(err => {
            return err.message;
        })
}

export default signUpApi