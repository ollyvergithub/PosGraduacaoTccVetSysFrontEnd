import api from '../api'
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};
export const getPacientes = async (nome='', cliente_uuid, especie_uuid, raca_uuid) => {
    return (await api.get(`/api/pacientes/?nome=${nome}${cliente_uuid ? '&cliente_uuid='+cliente_uuid : ''}${especie_uuid ? '&especie_uuid='+especie_uuid : ''}${raca_uuid ? '&raca_uuid='+raca_uuid : ''}`, authHeader)).data
};

export const getEspecies = async () => {
    return (await api.get(`/api/especies/`, authHeader)).data
};

export const getRacas = async () => {
    return (await api.get(`/api/racas/`, authHeader)).data
};