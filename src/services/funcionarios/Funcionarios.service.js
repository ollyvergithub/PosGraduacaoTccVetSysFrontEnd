import api from '../api'
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};

export const getFuncionarios = async (nome = '', cpf, rg, telefone) => {
    return (await api.get(`/api/funcionarios/?nome=${nome}${cpf ? '&cpf=' + cpf : ''}${rg ? '&rg=' + rg : ''}${telefone ? '&telefone=' + telefone : ''}`, authHeader)).data
};

export const retrieveFuncionario = async (funcionario_uuid) => {
    return (await api.get(`/api/funcionarios/${funcionario_uuid}`, authHeader)).data
};

export const postFuncionario = async (payload) => {
    return (await api.post(`/api/funcionarios/`, payload, authHeader))
};

export const patchFuncionario = async (funcionario_uuid, payload) => {
    return (await api.patch(`/api/funcionarios/${funcionario_uuid}/`, payload, authHeader))
};

export const deleteFuncionario = async (funcionario_uuid) => {
    return (await api.delete(`/api/funcionarios/${funcionario_uuid}/`, authHeader))
};

export const gerarRelatorioPdf = async (payload) => {
    return api
        .post(`/api/funcionarios/gerar-relatorio-pdf/`, payload, {
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
            link.setAttribute('download', 'relatorio-funcionarios.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            return error.response;
        })
};