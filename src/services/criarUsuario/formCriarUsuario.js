import api from "../api";

const formCriarUsuario = async (username, password1, password2, email) => {
    try {
        const user = {
            username: username,
            password1: password1,
            password2: password2,
            email: email,
        };
        const data = (await api.post('/api/rest-auth/registration/', user, {}));
        return data
    }catch (e) {
        console.log("Erro ao criar usuário e senha ", e)
        return e
    }
}

export default formCriarUsuario