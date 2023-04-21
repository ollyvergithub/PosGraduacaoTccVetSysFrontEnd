import api from '../api'
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};
export const getPacientes = async (nome = '', cliente_uuid, especie_uuid, raca_uuid) => {
    return (await api.get(`/api/pacientes/?nome=${nome}${cliente_uuid ? '&cliente_uuid=' + cliente_uuid : ''}${especie_uuid ? '&especie_uuid=' + especie_uuid : ''}${raca_uuid ? '&raca_uuid=' + raca_uuid : ''}`, authHeader)).data
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

export const gerarRelatorioPdf = async (payload) => {
    return api
        .post(`/api/pacientes/gerar-relatorio-pdf/`, payload, {
            responseType: 'blob',
            timeout: 30000,
            headers: {
                'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio-pacientes.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            return error.response;
        })
};

export const gerarEstatisticas = async () => {
    return api
        .get(`/api/pacientes/gerar-estatisticas`, {
            responseType: 'blob',
            timeout: 30000,
            headers: {
                'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            //Create a Blob from the arquivo Stream
            const file = new Blob([response.data], {type: response.data.type});
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            return fileURL
        }).catch(error => {
            return error.response;
        })
};


