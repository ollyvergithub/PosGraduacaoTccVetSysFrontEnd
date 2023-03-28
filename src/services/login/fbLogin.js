import api from "../api";
import {authService} from "../auth.service";

/**
 *
 * @param {*} accesstoken This is the accesstoken of the user obtained from Google
 */


const fbLogin = async (accesstoken) => {
    try {
        console.log("XXXXXxx fbLogin accesstoken ", accesstoken);
        let data = (await api.post("/api/rest-auth/facebook/",{access_token : accesstoken}));
        console.log("XXXXXxx fbLogin res ", data);
        if (data && data.data && data.data.key){
            await authService.gravaTokenLocalstorage(data.data.key)
            await authService.gravaUsuarioLocalstorage(data.data.key)
        }
        return await data.status;
    }catch (e) {
        console.log("Erro ao efetuar login com Facebook ", e)
    }

};

export default fbLogin;