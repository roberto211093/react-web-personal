import {BASE_PATH, API_VERSION} from "./config";

const postSendMailApi = async (contact) => {
    const {name, email, phone, message} = contact;
    const url = `${BASE_PATH}/${API_VERSION}/send-mail`;
    let data = {
        name,
        email: email.toLowerCase(),
        phone,
        message
    }
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    try {
        let response = await fetch(url, params);
        let result = await response.json();
        return result;
    }
    catch(err) {
        return err.message;
    }
}


export default postSendMailApi;