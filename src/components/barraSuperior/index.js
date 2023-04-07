import React from "react";
import "./barra-superior.scss"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone, faLocationDot, faEnvelope} from '@fortawesome/free-solid-svg-icons'

export const BarraSuperior = () => {
    return (
        <div className='container-barra-superior'>
            <div className='container'>
                <div className="d-flex justify-content-between py-2">
                    <p className='m-0 textos-barra-superior'>
                        <a href="tel:+551159275127">
                            <FontAwesomeIcon
                                style={{marginRight: "3px", color: '#555555'}}
                                icon={faPhone}
                            />
                            11 5927 5127
                        </a>
                    </p>
                    <p className='m-0'>
                        <FontAwesomeIcon
                            style={{marginRight: "3px", color: '#555555'}}
                            icon={faLocationDot}
                        />
                        Rua Antônio Borges da Fonseca, 39 - V. São José - São Paulo - SP
                    </p>
                    <p className='m-0 textos-barra-superior'>
                        <a href="mailto:ollyverottoboni@gmail.com?subject=Email enviado por VetSys&body=Conteúdo do email que será preenchido automaticamente">
                            <FontAwesomeIcon
                                style={{marginRight: "3px", color: '#555555'}}
                                icon={faEnvelope}
                            />
                            atendimento@vetsysy.com.br
                        </a>
                    </p>
                </div>

            </div>

        </div>
    )

}