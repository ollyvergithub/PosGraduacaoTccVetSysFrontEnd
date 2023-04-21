import api from "../api";
import {TOKEN_ALIAS} from "../auth.service";


const authHeader = {
    headers: {
        'Authorization': `Token ${localStorage.getItem(TOKEN_ALIAS)}`,
        'Content-Type': 'application/json'
    }
};

export const getClientes = async (nome = '', cpf, telefone, paciente_uuid) => {
    return (await api.get(`/api/clientes/?nome=${nome}${cpf ? '&cpf=' + cpf : ''}${telefone ? '&telefone=' + telefone : ''}${paciente_uuid ? '&paciente_uuid=' + paciente_uuid : ''}`, authHeader)).data
};

export const retrieveCliente = async (cliente_uuid) => {
    return (await api.get(`/api/clientes/${cliente_uuid}`, authHeader)).data
};

export const postCliente = async (payload) => {
    return (await api.post(`/api/clientes/`, payload, authHeader))
};


export const patchCliente = async (cliente_uuid, payload) => {
    return (await api.patch(`/api/clientes/${cliente_uuid}/`, payload, authHeader))
};

export const deleteCliente = async (cliente_uuid) => {
    return (await api.delete(`/api/clientes/${cliente_uuid}/`, authHeader))
};

export const gerarRelatorioPdf = async (payload) => {
    return api
        .post(`/api/clientes/gerar-relatorio-pdf/`, payload, {
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
            link.setAttribute('download', 'relatorio-clientes.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            return error.response;
        })
};

export const gerarEstatisticas = async () => {
    return api
        .get(`/api/clientes/gerar-estatisticas`, {
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