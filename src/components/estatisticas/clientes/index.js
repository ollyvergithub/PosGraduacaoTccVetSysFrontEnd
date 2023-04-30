import React, {useState} from "react";
import {PaginasContainer} from "../../paginasContainer";
import moment from "moment/moment";
import {getGerarEstatisticasPorAno, getGerarEstatisticasPorMesAno} from "../../../services/clientes/Clientes.service";
import {ConsultaPorAno} from "./ConsultaPorAno";
import {ConsultaPorMesAno} from "./ConsultaPorMesAno";
import {Lightbox} from "react-modal-image";
import Loading from "../../loading";


export const EstatisticasClientes = () => {

    const [showExibeModalEstatisticas, setShowExibeModalEstatisticas] = useState(false);
    const [urlImgEstatisticas, setUrlImgEstatisticas] = useState('');

    const [mesAno, setMesAno] = useState(new Date());
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

    return (
        <PaginasContainer>
            <div className='container mb-3'>
                <h5 className='mb-0'>Estatísticas de clientes</h5>
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
                    </div>
                }
            </div>
            <section>
                {showExibeModalEstatisticas && urlImgEstatisticas &&
                    <Lightbox
                        small={urlImgEstatisticas}
                        large={urlImgEstatisticas}
                        alt="Número de clientes"
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