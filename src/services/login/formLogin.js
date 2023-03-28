import api from "../api";

const authHeader = {
    'Content-Type': 'application/json'
};

const authHeaderAuthorization = {
    headers: {
        'Authorization': `Token ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
    }
};

const formLogin = async (username, password)=>{
    try {
        const user = {
            username: username,
            password: password
        };
        const data = (await api.post('/api/rest-auth/login/', user, authHeader));
        console.log("submit", data)
        // localStorage.clear();
        localStorage.setItem('access_token', data.data.key);
        if (data && data.data && data.data.key){
            const usuario = (await api.get('/api/users/me/', authHeaderAuthorization));

            console.log("usuario", usuario)

            localStorage.setItem('DADOS_USUARIO_LOGADO', JSON.stringify(usuario.data));
        }
    }catch (e) {
        console.log("Erro ao efetuar login ", e)
    }
}

export default formLogin;