import React, {useCallback, useEffect, useState} from "react";
import {gerarEstatisticas} from "../../services/clientes/Clientes.service";
import {Lightbox} from "react-modal-image";
import { useLocation, useNavigate } from "react-router-dom";

export const EstatisticasClientes = () => {
    const location = useLocation();
    const { from } = location.state;
    const navigate = useNavigate();

    const [showExibeModalEstatisticas, setShowExibeModalEstatisticas] = useState(false);
    const [urlImgEstatisticas, setUrlImgEstatisticas] = useState('');


    const estatisticas = useCallback( async () => {
        try {
            setShowExibeModalEstatisticas(true)
            let img = await gerarEstatisticas();
            setUrlImgEstatisticas(img)
        } catch (e) {
            setShowExibeModalEstatisticas(false)
            console.log("Erro ao gerar imagem de estatísticas ", e)
        }
    }, [])

    useEffect(()=>{
        estatisticas()
    }, [estatisticas])

    return(
        <section>
            {showExibeModalEstatisticas &&
                <Lightbox
                    small={urlImgEstatisticas}
                    large={urlImgEstatisticas}
                    alt="Número de clientes cadastrados por mês (2023)"
                    onClose={() => {
                        setShowExibeModalEstatisticas(false)
                        navigate(from)
                    }}
                />
            }
        </section>
    )

}