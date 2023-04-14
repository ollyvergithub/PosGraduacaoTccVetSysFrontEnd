import React, {useCallback, useEffect, useState} from "react";
import {deletePaciente, getEspecies, getPacientes, getRacas} from "../../services/pacientes/Pacientes.service";
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

export const Pacientes = () => {

    let {uuid} = useParams();

    console.log("XXXXXXXXXXXX PACIENTES uuid ", uuid)

    const [registros, setRegistros] = useState([])
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})
    const [clientes, setClientes] = useState([])
    const [especies, setEspecies] = useState([])
    const [racas, setRacas] = useState([])

    const buscarPacientes = useCallback(async (nome='', cliente_uuid='', especie_uuid='', raca_uuid='') => {
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
        let clientes =  await getClientes()
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
        let especies =  await getEspecies()
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
        let racas =  await getRacas()
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
        }catch (e) {
            console.log("Erro ao apagar paciente ", e)
        }
    }

    return (
        <PaginasContainer>
            <div className='container mb-3'>
                <TopoComBotaoAdicionarRegistro/>
                <Filtros
                    clientes={clientes}
                    especies={especies}
                    racas={racas}
                    buscarPacientes={buscarPacientes}
                />
                <Lista
                    registros={registros}
                    excluirRegistro={excluirRegistro}
                    setRegistroParaExcluir={setRegistroParaExcluir}
                    showExibeModalExcluir={showExibeModalExcluir}
                    setShowExibeModalExcluir={setShowExibeModalExcluir}
                />
            </div>
        </PaginasContainer>
    )
}