import * as yup from "yup";
export const YupValidation = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    // especie: yup.string().required("Espécie é obrigatória"),
    // porte: yup.string().required("Porte é obrigatório"),
    // raca: yup.string().required("Raça é obrigatório"),
});