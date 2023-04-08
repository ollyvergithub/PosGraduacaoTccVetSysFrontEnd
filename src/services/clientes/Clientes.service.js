import api from "../api";
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};

export const getClientes = async () => {
    return (await api.get(`/api/clientes/`, authHeader)).data
};