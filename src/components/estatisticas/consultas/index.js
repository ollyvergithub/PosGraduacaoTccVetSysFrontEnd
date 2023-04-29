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
import Loading from "../../loading";

export const EstatisticasConsultas = () => {

    const pacientes = UseRetornaPacientes()

    const [showExibeModalEstatisticas, setShowExibeModalEstatisticas] = useState(false);
    const [urlImgEstatisticas, setUrlImgEstatisticas] = useState('');

    const [mesAno, setMesAno] = useState(new Date());
    const [paciente, setPaciente] = useState();
    const [loading, setLoading] = useState(false);

    const gerarEstatitisticasPorAno = async () => {
        setLoading(true)
        try {
            setShowExibeModalEstatisticas(true)
            let ano = moment(mesAno).format("YYYY")
            let img = await getGerarEstatisticasPorAno(ano)
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
        }
        setLoading(false)
    }
    const gerarEstatitisticasPorMesAno = async () => {
        setLoading(true)
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
        setLoading(false)
    }

    const gerarEstatitisticasPorAnoPaciente = async () => {
        setLoading(true)
        try {
            setShowExibeModalEstatisticas(true)
            let ano = moment(mesAno).format("YYYY")
            let img = await getGerarEstatisticasPorPacienteAno(paciente, ano)
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
        }
        setLoading(false)
    }

    return (
        <PaginasContainer>
            <div className='container mb-3'>
                <h5 className='mb-0'>Estatísticas de consultas</h5>
                <hr/>
                {loading ? (
                        <Loading
                            corGrafico="black"
                            corFonte="dark"
                            marginTop="0"
                            marginBottom="0"
                            texto='Estatística sendo gerada, aguarde...'
                        />
                    ) :
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
                }
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