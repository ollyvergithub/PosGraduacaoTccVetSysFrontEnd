import React, {useCallback, useEffect, useState} from "react";
import {getEspecies, getPacientes, getRacas} from "../../services/pacientes/Pacientes.service";
import {getClientes} from "../../services/clientes/Clientes.service";
import {PaginasContainer} from "../paginasContainer";
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {TopoComBotaoAdicionarRegistro} from "./TopoComBotaoAdicionarRegistro";
import {Lista} from "./Lista";
import {Filtros} from "./Filtros";

export const Pacientes = () => {

    const [registros, setRegistros] = useState([])
    const [showExibeModalExcluir, setShowExibeModalExcluir] = useState(false);
    const [registroParaExcluir, setRegistroParaExcluir] = useState({})
    const [clientes, setClientes] = useState([])
    const [especies, setEspecies] = useState([])
    const [racas, setRacas] = useState([])

    const buscarRegistros = useCallback(async (nome='', cliente_uuid='', especie_uuid='', raca_uuid='') => {
        const registros = await getPacientes(nome ? nome : '', cliente_uuid, especie_uuid, raca_uuid)
        console.log('XXXXXXXXXXXX Pacientes ', registros)
        setRegistros(registros)
    }, [])

    useEffect(() => {
        let isSubscribed = true;

        // set state with the result if `isSubscribed` is true
        if (isSubscribed) {
            buscarRegistros()
                // make sure to catch any error
                .catch(console.error);
        }

        // cancel any future `setData`
        return () => isSubscribed = false;
    }, [buscarRegistros])

    const buscaClientes = useCallback(async () => {
        let clientes =  await getClientes()
        setClientes(clientes)
        console.log('XXXXXXXXXXXX clientes ', clientes)
    }, [])

    useEffect(() => {
        let isSubscribed = true;

        // set state with the result if `isSubscribed` is true
        if (isSubscribed) {
            buscaClientes()
                // make sure to catch any error
                .catch(console.error);
        }

        // cancel any future `setData`
        return () => isSubscribed = false;
    }, [buscaClientes])

    const buscaEspecies = useCallback(async () => {
        let especies =  await getEspecies()
        setEspecies(especies)
        console.log('XXXXXXXXXXXX especies ', especies)
    }, [])

    useEffect(() => {
        let isSubscribed = true;

        // set state with the result if `isSubscribed` is true
        if (isSubscribed) {
            buscaEspecies()
                // make sure to catch any error
                .catch(console.error);
        }

        // cancel any future `setData`
        return () => isSubscribed = false;
    }, [buscaEspecies])

    const buscaRacas = useCallback(async () => {
        let racas =  await getRacas()
        setRacas(racas)
        console.log('XXXXXXXXXXXX racas ', racas)
    }, [])

    useEffect(() => {
        let isSubscribed = true;

        // set state with the result if `isSubscribed` is true
        if (isSubscribed) {
            buscaRacas()
                // make sure to catch any error
                .catch(console.error);
        }

        // cancel any future `setData`
        return () => isSubscribed = false;
    }, [buscaRacas])

    const excluirRegistro = async () => {
        console.log("CCCCCCCCCCC excluirRegistro ", registroParaExcluir)
        setShowExibeModalExcluir(false)
        await buscarRegistros()
    }

    return (
        <PaginasContainer>
            <div className='container mb-3'>
                <TopoComBotaoAdicionarRegistro/>
                <Filtros
                    clientes={clientes}
                    especies={especies}
                    racas={racas}
                    buscarRegistros={buscarRegistros}
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