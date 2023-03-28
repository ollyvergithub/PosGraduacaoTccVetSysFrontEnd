import api from "./api";

export const TOKEN_ALIAS = "TOKEN";
export const DADOS_USUARIO_LOGADO_ALIAS = "DADOS_USUARIO_LOGADO";

const gravaTokenLocalstorage = async (token) => {
    localStorage.setItem(TOKEN_ALIAS, token);
}
const gravaUsuarioLocalstorage = async (token) => {

    try {
        const authHeaderAuthorization = {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const usuario = (await api.get('/api/users/me/', authHeaderAuthorization));
        console.log("usuario", usuario)
        localStorage.setItem(DADOS_USUARIO_LOGADO_ALIAS, JSON.stringify(usuario.data));
    }catch (e) {
        console.log("Erro ao salvar usuário no LocalStorage ", e)
    }
}


export const authService = {
    gravaUsuarioLocalstorage,
    gravaTokenLocalstorage,
}