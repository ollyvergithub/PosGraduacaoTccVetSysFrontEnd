import React from "react";
import moment from "moment";

export const dataFormatada = (data) => {
    return (
        <div>
            {data ? moment(data).format('DD/MM/YYYY') : ''}
        </div>
    )
};

export const valorFormatado = (valor) => {
    const valorFormatado = valor
        ? Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
        : '';
    return (valorFormatado)
};

export const numeroFormatado = (valor) => {
    let numeroFormatado = valor
        ? Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
        : '';
    numeroFormatado = numeroFormatado.replace(/R/, "").replace(/\$/, "");
    return (numeroFormatado)
};
