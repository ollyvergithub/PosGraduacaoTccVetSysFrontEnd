import React from "react";
import {Link} from "react-router-dom";

export const TopoComBotaoAdicionarRegistro = () => {
    return(
        <div className="d-flex align-items-center mb-3">
            <div className="p-2 flex-grow-1 bd-highlight">
                <h5 className='mb-0'>Lista de Pacientes</h5>
            </div>
            <div className="p-2 bd-highlight">
                <Link
                    to={{
                        pathname: `/cadastro-de-paciente/`,
                    }}
                    className='btn btn-success'
                >
                    Adicionar novo paciente
                </Link>
            </div>
        </div>
    )

}