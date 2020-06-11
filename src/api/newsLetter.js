import {BASE_PATH, API_VERSION} from "./config";

const postSuscribeApi = async (email) => {
    const url = `${BASE_PATH}/${API_VERSION}/newsletter/${email.toLowerCase()}`;
    const params = {
        method: "POST",
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

export default postSuscribeApi