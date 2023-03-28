import api from "../api";

/**
 *
 * @param {*} accesstoken This is the accesstoken of the user obtained from Google
 */


const fbLogin = async (accesstoken) => {
    console.log("XXXXXxx fbLogin accesstoken ", accesstoken);
    let res = await api.post(
        "/api/rest-auth/facebook/",
        {
            access_token : accesstoken,
        }
    );
    console.log("XXXXXxx fbLogin res ", res);
    return await res.status;
};

export default fbLogin;