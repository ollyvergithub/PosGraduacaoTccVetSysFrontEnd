import React, {useCallback, useEffect, useState} from "react";
import {
    deleteFuncionario,
    getFuncionarios, gerarRelatorioPdf
} from "../../services/funcionarios/Funcionarios.service";
import {Lista} from "./Lista";
import {PaginasContainer} from "../paginasContainer";
import {toastCustom} from "../toastCustom";
import {TopoComBotaoAdicionarRegistro} from "../TopoComBotaoAdicionarRegistro";
import {Filtros} from "./Filtros";
import {Relatorio} from "./Relatorio";
import Loading from "../loading";
import {ModalErro} from "../modalBootstrap/ModalErro";

export const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState([])
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);

    const buscaFuncionarios = useCallback(async (nome = '', cpf = '', rg = '', telefone = '') => {
        let funcionarios = await getFuncionarios(nome ? nome : '', cpf, rg, telefone)
        setFuncionarios(funcionarios)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscaFuncionarios()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscaFuncionarios])

    const excluirRegistro = async () => {
        try {
            setShowExibeModalExcluir(false)
            await deleteFuncionario(registroParaExcluir.uuid)
            toastCustom.ToastCustomSuccess('Exclusão de funcionário com sucesso.', 'O Funcionário foi excluído com sucesso.')
            await buscaFuncionarios()
        } catch (e) {
            setShowExibeModalExcluir(false)
            setShowExibeModalErro(true)
            console.log("Erro ao apagar funcionário ", e)
        }
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_administrativos": funcionarios.map(lanc => lanc.uuid),
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
                        titulo='Lista de funcionários'
                        rota='/cadastro-de-funcionario/'
                        textoBotao='Adicionar novo funcionário'
                    />
                    <Filtros
                        buscaFuncionarios={buscaFuncionarios}
                    />
                    <Relatorio
                        relatorioPdf={relatorioPdf}
                        funcionarios={funcionarios}
                    />
                    <Lista
                        funcionarios={funcionarios}
                        excluirRegistro={excluirRegistro}
                        setRegistroParaExcluir={setRegistroParaExcluir}
                        showExibeModalExcluir={showExibeModalExcluir}
                        setShowExibeModalExcluir={setShowExibeModalExcluir}
                    />

                    <section>
                        <ModalErro
                            show={showExibeModalErro}
                            handleClose={() => setShowExibeModalErro(false)}
                            titulo={"Erro ao excluir o cliente"}
                            texto={"<p>Não foi possível excluir o funcionário, tente novamente</p>"}
                            primeiroBotaoTexto="Fechar"
                            primeiroBotaoCss="success"
                        />
                    </section>
                </div>
            }
        </PaginasContainer>
    )

}