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

export const retrievePaciente = async (paciente_uuid) => {
    return (await api.get(`/api/pacientes/${paciente_uuid}`, authHeader)).data
};

export const postPaciente = async (payload) => {
    return (await api.post(`/api/pacientes/`, payload, authHeader))
};

export const patchPaciente = async (paciente_uuid, payload) => {
    return (await api.patch(`/api/pacientes/${paciente_uuid}/`, payload, authHeader))
};
export const deletePaciente = async (paciente_uuid) => {
    return (await api.delete(`/api/pacientes/${paciente_uuid}/`, authHeader))
};

export const getEspecies = async () => {
    return (await api.get(`/api/especies/`, authHeader)).data
};

export const getRacas = async () => {
    return (await api.get(`/api/racas/`, authHeader)).data
};

export const getPortes = async () => {
    return (await api.get(`/api/portes/`, authHeader)).data
};

