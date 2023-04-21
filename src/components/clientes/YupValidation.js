import * as yup from "yup";
export const YupValidation = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
});