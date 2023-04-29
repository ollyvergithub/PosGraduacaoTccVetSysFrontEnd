import React, {useState} from "react";

import {PaginasContainer} from "../../paginasContainer";
import moment from "moment";
import {
    getGerarEstatisticasPorAno,
    getGerarEstatisticasPorMesAno,
    getGerarEstatisticasPorPacienteAno
} from "../../../services/consultas/Consultas.service";
import {Lightbox} from "react-modal-image";
import {UseRetornaPacientes} from "../../../hooks/UseRetornaPacientes";
import {ConsultaPorAno} from "./ConsultaPorAno";
import {ConsultaPorMesAno} from "./ConsultaPorMesAno";
import {ConsultaPorPacienteAno} from "./ConsultaPorPacienteAno";

export const EstatisticasConsultas = () => {

    const pacientes = UseRetornaPacientes()

    const [showExibeModalEstatisticas, setShowExibeModalEstatisticas] = useState(false);
    const [urlImgEstatisticas, setUrlImgEstatisticas] = useState('');

    const [mesAno, setMesAno] = useState(new Date());
    const [paciente, setPaciente] = useState();

    const gerarEstatitisticasPorMesAno = async () => {
        try {
            setShowExibeModalEstatisticas(true)
            let ano = moment(mesAno).format("YYYY")
            let mes = moment(mesAno).format("MM")
            let img = await getGerarEstatisticasPorMesAno(mes, ano)
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
        }
    }

    const gerarEstatitisticasPorAno = async () => {
        try {
            setShowExibeModalEstatisticas(true)
            let ano = moment(mesAno).format("YYYY")
            let img = await getGerarEstatisticasPorAno(ano)
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
        }
    }

    const gerarEstatitisticasPorAnoPaciente = async () => {
        try {
            setShowExibeModalEstatisticas(true)
            let ano = moment(mesAno).format("YYYY")
            let img = await getGerarEstatisticasPorPacienteAno(paciente, ano)
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
        }
    }

    return (
        <PaginasContainer>
            <div className='container mb-3'>
                <h5 className='mb-0'>Estatísticas de consultas</h5>
                <hr/>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <ConsultaPorAno
                        mesAno={mesAno}
                        setMesAno={setMesAno}
                        gerarEstatitisticasPorAno={gerarEstatitisticasPorAno}
                    />
                    <ConsultaPorMesAno
                        mesAno={mesAno}
                        setMesAno={setMesAno}
                        gerarEstatitisticasPorMesAno={gerarEstatitisticasPorMesAno}
                    />
                    <ConsultaPorPacienteAno
                        mesAno={mesAno}
                        setMesAno={setMesAno}
                        pacientes={pacientes}
                        paciente={paciente}
                        setPaciente={setPaciente}
                        gerarEstatitisticasPorAnoPaciente={gerarEstatitisticasPorAnoPaciente}
                    />
                </div>
            </div>
            <section>
                {showExibeModalEstatisticas && urlImgEstatisticas &&
                    <Lightbox
                        small={urlImgEstatisticas}
                        large={urlImgEstatisticas}
                        alt="Número de consultas"
                        onClose={() => {
                            setShowExibeModalEstatisticas(false)
                            setUrlImgEstatisticas('')
                        }}
                    />
                }
            </section>
        </PaginasContainer>
    )

}