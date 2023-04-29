import React, {useCallback, useEffect, useState} from "react";
import {getHistoricoDeConsultas} from "../../services/consultas/Consultas.service";
import {retrievePaciente} from "../../services/pacientes/Pacientes.service";

export const HistoricoDeConsultas = ({pacienteUuid, consultaUuid}) => {

    const [historicoDeConsultas, setHistoricoDeConsultas] = useState([])
    const [paciente,setPaciente] = useState('')

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

    const carregaPaciente = useCallback(async ()=>{
        if (pacienteUuid){
            let paciente = await retrievePaciente(pacienteUuid)
            setPaciente(paciente)
        }else {
            setPaciente('')
        }


    }, [pacienteUuid])

    useEffect(()=>{
        carregaPaciente()
            .catch("Erro ao buscar paciente")
    }, [carregaPaciente])

    return (
        <>
            {/*<h5><strong>Histórico de consultas {pacienteRef && pacienteRef.current && pacienteRef.current}</strong></h5>*/}
            <h5><strong>Histórico de consultas {paciente && paciente.nome && paciente.nome}</strong></h5>
            {!pacienteUuid ? (
                    <p>Selecione um paciente para exibir o histórico</p>
                ) :
                <>
                    {historicoDeConsultas && historicoDeConsultas.length > 0 ?

                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            {historicoDeConsultas.map(item =>
                                <div key={item.uuid} className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-${item.uuid}`} aria-expanded="true" aria-controls={`panelsStayOpen-${item.uuid}`}>
                                            <i><strong>Data:</strong> {item.data_da_consulta} | <strong>Veterinário:</strong> {item.veterinario.nome} | <strong>CRMV: </strong>{item.veterinario.crmv}</i>
                                        </button>
                                    </h2>
                                    <div id={`panelsStayOpen-${item.uuid}`} className="accordion-collapse collapse">
                                        <div className="accordion-body">
                                            <p className='mb-0'>{item.ficha_clinica}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        :
                            <p>Não existe histórico de consultas para esse paciente</p>
                    }
                </>
            }

        </>
    )
}