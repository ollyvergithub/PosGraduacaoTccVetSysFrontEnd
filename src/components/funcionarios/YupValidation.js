import * as yup from "yup";
export const YupValidation = yup.object().shape({
    nome: yup.string().required("Nome AQUI é obrigatório"),
    dependentes_do_funcionario: yup.array()
        .of(
            yup.object().shape({
                nome: yup.string().required("Nome do dependente é obrigatório"),
            })
        )
});