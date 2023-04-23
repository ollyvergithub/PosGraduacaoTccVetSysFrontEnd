import React, {useCallback, useEffect, useState} from "react";
import {deleteCliente, getClientes, gerarRelatorioPdf} from "../../services/clientes/Clientes.service";
import {getPacientes} from "../../services/pacientes/Pacientes.service";
import {PaginasContainer} from "../paginasContainer";
import {Lista} from "./Lista";
import {toastCustom} from "../toastCustom";
import {Filtros} from "./Filtros";
import {TopoComBotaoAdicionarRegistro} from "../TopoComBotaoAdicionarRegistro";
import {Relatorio} from "./Relatorio";
import Loading from "../loading";
import {ModalErro} from "../modalBootstrap/ModalErro";

export const Clientes = () => {

    const [clientes, setClientes] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})

    const buscaClientes = useCallback(async (nome = '', cpf = '', telefone = '', paciente_uuid = '') => {
        let clientes = await getClientes(nome ? nome : '', cpf, telefone, paciente_uuid)
        setClientes(clientes)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscaClientes()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscaClientes])


    const buscarPacientes = useCallback(async () => {
        const pacientes = await getPacientes()
        setPacientes(pacientes)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscarPacientes()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscarPacientes])

    const excluirRegistro = async () => {
        try {
            setShowExibeModalExcluir(false)
            await deleteCliente(registroParaExcluir.uuid)
            toastCustom.ToastCustomSuccess('Exclusão de paciente com sucesso.', 'O Paciente foi excluído com sucesso.')
            await buscaClientes()
        } catch (e) {
            setShowExibeModalExcluir(false)
            setShowExibeModalErro(true)
            console.log("Erro ao apagar cliente ", e)
        }
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_clientes": clientes.map(lanc => lanc.uuid),
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
                        titulo='Lista de clientes'
                        rota='/cadastro-de-cliente/'
                        textoBotao='Adicionar novo cliente'
                    />
                    <Filtros
                        buscarClientes={buscaClientes}
                        pacientes={pacientes}
                    />
                    <Relatorio
                        relatorioPdf={relatorioPdf}
                        clientes={clientes}
                    />
                    <Lista
                        clientes={clientes}
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
                            texto={"<p>Não foi possível excluir o cliente, tente novamente</p>"}
                            primeiroBotaoTexto="Fechar"
                            primeiroBotaoCss="success"
                        />
                    </section>

                </div>
            }
        </PaginasContainer>
    )
}