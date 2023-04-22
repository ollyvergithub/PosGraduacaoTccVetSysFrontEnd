import api from '../api'
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};

export const getVeterinarios = async (nome = '', cpf, crmv, telefone) => {
    return (await api.get(`/api/veterinarios/?nome=${nome}${cpf ? '&cpf=' + cpf : ''}${crmv ? '&crmv=' + crmv : ''}${telefone ? '&telefone=' + telefone : ''}`, authHeader)).data
};

export const retrieveVeterinario = async (veterinario_uuid) => {
    return (await api.get(`/api/veterinarios/${veterinario_uuid}`, authHeader)).data
};

export const postVeterinario = async (payload) => {
    return (await api.post(`/api/veterinarios/`, payload, authHeader))
};

export const patchVeterinario = async (veterinario_uuid, payload) => {
    return (await api.patch(`/api/veterinarios/${veterinario_uuid}/`, payload, authHeader))
};

export const deleteVeterinario = async (veterinario_uuid) => {
    return (await api.delete(`/api/veterinarios/${veterinario_uuid}/`, authHeader))
};

export const gerarRelatorioPdf = async (payload) => {
    return api
        .post(`/api/veterinarios/gerar-relatorio-pdf/`, payload, {
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
            link.setAttribute('download', 'relatorio-veterinarios.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            return error.response;
        })
};