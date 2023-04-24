import api from '../api'
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};

export const getConsultas = async (data_da_consulta = '', paciente_uuid, cliente_uuid, veterinario_uuid) => {
    return (await api.get(`/api/consultas/?data_da_consulta=${data_da_consulta}${paciente_uuid ? '&paciente_uuid=' + paciente_uuid : ''}${cliente_uuid ? '&cliente_uuid=' + cliente_uuid : ''}${veterinario_uuid ? '&veterinario_uuid=' + veterinario_uuid : ''}`, authHeader)).data
};

export const retrieveConsulta = async (consulta_uuid) => {
    return (await api.get(`/api/consultas/${consulta_uuid}`, authHeader)).data
};

export const postConsulta = async (payload) => {
    return (await api.post(`/api/consultas/`, payload, authHeader))
};

export const patchConsulta = async (consulta_uuid, payload) => {
    return (await api.patch(`/api/consultas/${consulta_uuid}/`, payload, authHeader))
};

export const deleteConsulta = async (consulta_uuid) => {
    return (await api.delete(`/api/consultas/${consulta_uuid}/`, authHeader))
};

export const gerarRelatorioPdf = async (payload) => {
    return api
        .post(`/api/consultas/gerar-relatorio-pdf/`, payload, {
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
            link.setAttribute('download', 'relatorio-consultas.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            return error.response;
        })
};