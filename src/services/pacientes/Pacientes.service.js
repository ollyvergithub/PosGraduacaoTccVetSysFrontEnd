import api from '../api'
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};
export const getPacientes = async () => {
    return (await api.get(`/api/pacientes/`, authHeader)).data
};