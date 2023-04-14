import React, {useEffect} from "react";
import {ModalFormBody} from "./index";
import {gerarEstatisticas} from "../../services/pacientes/Pacientes.service";

export const ModalVisualizarEstatisticas = (props) =>{

    const exibeArquivoDeReferencia = async () =>{
        try {
            await gerarEstatisticas();
        }catch (e) {
            console.log("Erro ao visualizar estatística ", e.response);
        }
    }

    useEffect(()=>{
        exibeArquivoDeReferencia()
    })

    const bodyTextarea = () => {
        return (
            <>
                <object id='visualizar_estatistica'>

                </object>
            </>
        )
    };

    return (
        <ModalFormBody
            show={props.show}
            onHide={props.handleClose}
            titulo={props.titulo}
            size='lg'
            bodyText={bodyTextarea()}
            primeiroBotaoOnclick={props.handleClose}
            primeiroBotaoTexto={props.primeiroBotaoTexto}
            primeiroBotaoCss={props.primeiroBotaoCss}
            segundoBotaoOnclick={props.segundoBotaoOnclick}
            segundoBotaoCss={props.segundoBotaoCss}
            segundoBotaoTexto={props.segundoBotaoTexto}
        />
    )
};