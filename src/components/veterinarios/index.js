import React, {useCallback, useEffect, useState} from "react";
import {deleteVeterinario, getVeterinarios, gerarRelatorioPdf} from "../../services/veterinarios/Veterinarios.service";
import {toastCustom} from "../toastCustom";
import Loading from "../loading";
import {PaginasContainer} from "../paginasContainer";
import {TopoComBotaoAdicionarRegistro} from "../TopoComBotaoAdicionarRegistro";
import {Filtros} from "./Filtros";
import {Relatorio} from "./Relatorio";
import {Lista} from "./Lista";

export const Veterinarios = () => {
    const [veterinarios, setVeterinarios] = useState([])
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [loading, setLoading] = useState(false);

    const buscaVeterinarios = useCallback(async (nome = '', cpf = '', crmv = '', telefone = '') => {
        let veterinarios = await getVeterinarios(nome ? nome : '', cpf, crmv, telefone)
        console.log("CCCCCCCC veterinarios ", veterinarios)
        setVeterinarios(veterinarios)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscaVeterinarios()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscaVeterinarios])

    const excluirRegistro = async () => {
        try {
            setShowExibeModalExcluir(false)
            await deleteVeterinario(registroParaExcluir.uuid)
            toastCustom.ToastCustomSuccess('Exclusão de funcionário com sucesso.', 'O Funcionário foi excluído com sucesso.')
            await buscaVeterinarios()
        } catch (e) {
            console.log("Erro ao apagar funcionário ", e)
        }
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_veterinarios": veterinarios.map(lanc => lanc.uuid),
            });
            setLoading(false)
        } catch (e) {
            console.log("Erro ao gerar relatório ", e)
        }
    };


    return (
        <PaginasContainer>
            {loading ? (
                    <Loading
                        corGrafico="black"
                        corFonte="dark"
                        marginTop="0"
                        marginBottom="0"
                        texto='Relatório sendo gerado, aguarde...'
                    />
                ) :
                <div className='container mb-3'>
                    <TopoComBotaoAdicionarRegistro
                        titulo='Lista de veterinários'
                        rota='/cadastro-de-veterinario/'
                        textoBotao='Adicionar novo veterinário'
                    />
                    <Filtros
                        buscaVeterinarios={buscaVeterinarios}
                    />
                    <Relatorio
                        relatorioPdf={relatorioPdf}
                        veterinarios={veterinarios}
                    />
                    <Lista
                        veterinarios={veterinarios}
                        excluirRegistro={excluirRegistro}
                        setRegistroParaExcluir={setRegistroParaExcluir}
                        showExibeModalExcluir={showExibeModalExcluir}
                        setShowExibeModalExcluir={setShowExibeModalExcluir}
                    />
                </div>
            }
        </PaginasContainer>
    )

}