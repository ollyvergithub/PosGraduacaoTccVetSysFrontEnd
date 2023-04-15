import React, {useCallback, useEffect, useState} from "react";
import {
    deletePaciente, gerarEstatisticas,
    gerarRelatorioPdf,
    getEspecies,
    getPacientes,
    getRacas
} from "../../services/pacientes/Pacientes.service";
import {getClientes} from "../../services/clientes/Clientes.service";
import {PaginasContainer} from "../paginasContainer";
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {TopoComBotaoAdicionarRegistro} from "./TopoComBotaoAdicionarRegistro";
import {Lista} from "./Lista";
import {Filtros} from "./Filtros";
import {toastCustom} from "../toastCustom";
import {useParams} from "react-router-dom";
import {Lightbox} from "react-modal-image";
import {Relatorio} from "./Relatorio";
import Loading from "../loading";

export const Pacientes = () => {

    let {uuid} = useParams();

    console.log("XXXXXXXXXXXX PACIENTES uuid ", uuid)

    const [registros, setRegistros] = useState([])
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [showExibeModalEstatisticas, setShowExibeModalEstatisticas] = useState(false);
    const [urlImgEstatisticas, setUrlImgEstatisticas] = useState('');
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})
    const [clientes, setClientes] = useState([])
    const [especies, setEspecies] = useState([])
    const [racas, setRacas] = useState([])
    const [loading, setLoading] = useState(false);

    const buscarPacientes = useCallback(async (nome = '', cliente_uuid = '', especie_uuid = '', raca_uuid = '') => {
        const registros = await getPacientes(nome ? nome : '', cliente_uuid, especie_uuid, raca_uuid)
        setRegistros(registros)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscarPacientes()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscarPacientes])

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

    const buscaEspecies = useCallback(async () => {
        let especies = await getEspecies()
        setEspecies(especies)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscaEspecies()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscaEspecies])

    const buscaRacas = useCallback(async () => {
        let racas = await getRacas()
        setRacas(racas)
    }, [])

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            buscaRacas()
                .catch(console.error);
        }
        return () => isSubscribed = false;
    }, [buscaRacas])

    const excluirRegistro = async () => {
        try {
            setShowExibeModalExcluir(false)
            await deletePaciente(registroParaExcluir.uuid)
            toastCustom.ToastCustomSuccess('Exclusão de paciente com sucesso.', 'O Paciente foi excluído com sucesso.')
            await buscarPacientes()
        } catch (e) {
            console.log("Erro ao apagar paciente ", e)
        }
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_pacientes": registros.map(lanc => lanc.uuid),
            });
            setLoading(false)
        } catch (e) {
            console.log("Erro ao gerar relatório ", e)
        }
    };

    const estatisticas = async () => {
        try {
            setShowExibeModalEstatisticas(true)
            let img = await gerarEstatisticas();
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
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
                        relatorioPdf={relatorioPdf}
                        estatisticas={estatisticas}
                    />
                    <Filtros
                        clientes={clientes}
                        especies={especies}
                        racas={racas}
                        buscarPacientes={buscarPacientes}
                    />
                    <Relatorio
                        relatorioPdf={relatorioPdf}
                    />

                    <Lista
                        registros={registros}
                        excluirRegistro={excluirRegistro}
                        setRegistroParaExcluir={setRegistroParaExcluir}
                        showExibeModalExcluir={showExibeModalExcluir}
                        setShowExibeModalExcluir={setShowExibeModalExcluir}
                    />
                    <section>
                        {showExibeModalEstatisticas &&
                            <Lightbox
                                small={urlImgEstatisticas}
                                large={urlImgEstatisticas}
                                alt="Número de clientes cadastrados por mês (2023)"
                                onClose={() => setShowExibeModalEstatisticas(false)}
                            />
                        }
                    </section>
                </div>
            }
        </PaginasContainer>
    )
}