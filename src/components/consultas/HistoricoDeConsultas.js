import React, {useCallback, useEffect, useState} from "react";
import {getHistoricoDeConsultas} from "../../services/consultas/Consultas.service";

export const HistoricoDeConsultas = ({pacienteUuid, consultaUuid}) => {

    const [historicoDeConsultas, setHistoricoDeConsultas] = useState([])

    const carregaHistoricoDeConsultas = useCallback(async () => {
        if (pacienteUuid) {
            let historico = await getHistoricoDeConsultas(pacienteUuid, consultaUuid)
            setHistoricoDeConsultas(historico)
        }
    }, [pacienteUuid, consultaUuid])

    useEffect(() => {
        carregaHistoricoDeConsultas()
            .catch(console.error);
    }, [carregaHistoricoDeConsultas])

    return (
        <>
            <h5><strong>Histórico de consultas</strong></h5>
            {!pacienteUuid ? (
                    <p>Selecione um paciente para exibir o histórico</p>
                ) :
                <>

                    {historicoDeConsultas && historicoDeConsultas.length > 0 ? historicoDeConsultas.map(item =>

                        <div key={item.uuid} className='border-bottom mb-3 pb-2'>
                            <p className='mb-0 fonte-14'><i><strong>Data:</strong> {item.data_da_consulta} | <strong>Veterinário:</strong> {item.veterinario.nome} | <strong>CRMV: </strong>{item.veterinario.crmv}</i></p>
                            <p className='mb-0'>{item.ficha_clinica}</p>
                        </div>

                        ) :

                        <p>Não existe histórico de consultas para esse paciente</p>
                    }
                </>
            }

        </>
    )
}