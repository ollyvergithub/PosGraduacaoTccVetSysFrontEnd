import React, {useCallback, useEffect, useState} from "react";
import {deleteConsulta, getConsultas, gerarRelatorioPdf} from "../../services/consultas/Consultas.service";
import {getPacientes} from "../../services/pacientes/Pacientes.service";
import {getVeterinarios} from "../../services/veterinarios/Veterinarios.service";
import {toastCustom} from "../toastCustom";
import {ModalErro} from "../modalBootstrap/ModalErro";
import {Lista} from "./Lista";
import {getClientes} from "../../services/clientes/Clientes.service";
import {PaginasContainer} from "../paginasContainer";
import {TopoComBotaoAdicionarRegistro} from "../TopoComBotaoAdicionarRegistro";
import {Filtros} from "./Filtros";
import {Relatorio} from "./Relatorio";
import Loading from "../loading";

export const Consultas = () => {
    const [consultas, setConsultas] = useState([])
    const [clientes, setClientes] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [veterinarios, setVeterinarios] = useState([])
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})


    const buscaConsultas = useCallback(async (data_da_consulta = '', paciente_uuid = '', cliente_uuid = '', veterinario_uuid = '') => {
        let consultas = await getConsultas(data_da_consulta ? data_da_consulta : '', paciente_uuid, cliente_uuid, veterinario_uuid)
        setConsultas(consultas)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscaConsultas()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscaConsultas])

    const buscaClientes = useCallback(async () => {
        let clientes = await getClientes()
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

    const buscaVeterinarios = useCallback(async () => {
        let veterinarios = await getVeterinarios()
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
            await deleteConsulta(registroParaExcluir.uuid)
            toastCustom.ToastCustomSuccess('Exclusão de consulta com sucesso.', 'A Consulta foi excluída com sucesso.')
            await buscaConsultas()
        } catch (e) {
            setShowExibeModalExcluir(false)
            setShowExibeModalErro(true)
            console.log("Erro ao apagar consulta ", e)
        }
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_consultas": consultas.map(lanc => lanc.uuid),
            });
            setLoading(false)
        } catch (e) {
            console.log("Erro ao gerar relatório ", e)
        }
    };

    return (
        <>
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
                            titulo='Lista de consultas'
                            rota='/cadastro-de-consulta/'
                            textoBotao='Adicionar nova consulta'
                        />

                        <Filtros
                            buscarConsultas={buscaConsultas}
                            pacientes={pacientes}
                            clientes={clientes}
                            veterinarios={veterinarios}
                        />
                        <Relatorio
                            consultas={consultas}
                            relatorioPdf={relatorioPdf}
                        />

                        <Lista
                            consultas={consultas}
                            excluirRegistro={excluirRegistro}
                            setRegistroParaExcluir={setRegistroParaExcluir}
                            showExibeModalExcluir={showExibeModalExcluir}
                            setShowExibeModalExcluir={setShowExibeModalExcluir}
                        />

                        <section>
                            <ModalErro
                                show={showExibeModalErro}
                                handleClose={() => setShowExibeModalErro(false)}
                                titulo={"Erro ao excluir a consulta"}
                                texto={"<p>Não foi possível excluir a consulta, tente novamente</p>"}
                                primeiroBotaoTexto="Fechar"
                                primeiroBotaoCss="success"
                            />
                        </section>
                    </div>
                }
            </PaginasContainer>

        </>
    )

}