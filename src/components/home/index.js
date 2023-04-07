import React from "react";
import "./home.scss"
import {PaginasContainer} from "../PaginasContainer";
import ImgHome from "../../assets/img/img-home.png"



export const Home = () => {

    return (
        <PaginasContainer>
            <div className='container-barra-superior-apresentacao'>
                <h2 className='pt-2'>Clínica e Petshop</h2>
                <p className='m-0 pb-2'>Uma solução completa para sua Clínica Veterinária ou Petshop!</p>
            </div>
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={ImgHome} className="img-fluid" alt="imagem-apresentação VetSys"/>
                    </div>
                    <div className='col-md-8'>
                        <h3 className='text-black'>BEM – VINDO AO VET SYS </h3>
                        <h6><strong>Escolha as uma das opções acima no menu para começar.</strong></h6>
                        <p>No entanto, não podemos esquecer que o início da atividade geral de formação de atitudes desafia a capacidade de equalização dos níveis de motivação departamental. O que temos que ter sempre em mente é que a valorização de fatores subjetivos afeta positivamente a correta previsão do retorno esperado a longo prazo. Evidentemente, o desenvolvimento contínuo de distintas formas de atuação exige a precisão e a definição do sistema de participação geral. As experiências acumuladas demonstram que a estrutura atual da organização auxilia a preparação e a composição dos relacionamentos verticais entre as hierarquias. Do mesmo modo, a hegemonia do ambiente político faz parte de um processo de gerenciamento dos métodos utilizados na avaliação de resultados.</p>
                    </div>
                </div>
            </div>
        </PaginasContainer>
    )

}