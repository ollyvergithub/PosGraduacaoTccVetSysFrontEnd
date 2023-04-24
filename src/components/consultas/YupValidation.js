import * as yup from "yup";
export const YupValidation = yup.object().shape({
    data_da_consulta: yup.string().required("Data da consulta é obrigatória"),
    paciente: yup.string().required("Paciente é obrigatório"),
    cliente: yup.string().required("Cliente é obrigatório"),
    veterinario: yup.string().required("Veterinario é obrigatório"),
    tipo_de_consulta: yup.string().required("Tipo de Consulta é obrigatória"),
    ficha_clinica: yup.string().required("Ficha Clínica é obrigatória"),
});