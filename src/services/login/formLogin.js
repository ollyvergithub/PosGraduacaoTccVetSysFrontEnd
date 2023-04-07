import api from "../api";
import {authService} from "../auth.service";

const authHeader = {
    'Content-Type': 'application/json'
};

const formLogin = async (username, password)=>{
    try {
        const user = {
            username: username,
            password: password
        };
        const data = (await api.post('/api/rest-auth/login/', user, authHeader));
        if (data && data.data && data.data.key){
            await authService.gravaTokenLocalstorage(data.data.key)
            await authService.gravaUsuarioLocalstorage(data.data.key)
        }
        return data
    }catch (e) {
        console.log("Erro ao efetuar login com usuário e senha ", e)
        return e
    }
}

export default formLogin;