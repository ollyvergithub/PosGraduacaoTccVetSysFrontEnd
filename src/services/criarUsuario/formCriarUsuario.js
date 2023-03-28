import api from "../api";
import {authService, TOKEN_ALIAS} from "../auth.service";

const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};

const formCriarUsuario = async (username, password1, password2, email) => {
    try {
        const user = {
            username: username,
            password1: password1,
            password2: password2,
            email: email,
        };
        debugger
        const data = (await api.post('/api/rest-auth/registration/', user, {}));
        console.log("submit", data)
        if (data && data.status === 204){
            window.location.assign('/login')
        }

    }catch (e) {
        console.log("Erro ao criar usuário e senha ", e)
    }
}

export default formCriarUsuario