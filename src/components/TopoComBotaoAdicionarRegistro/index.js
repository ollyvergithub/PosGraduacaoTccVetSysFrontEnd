import React from "react";
import {Link} from "react-router-dom";

export const TopoComBotaoAdicionarRegistro = ({titulo, rota, textoBotao}) => {
    return(
        <div className="d-flex align-items-center mb-3">
            <div className="py-2 flex-grow-1 bd-highlight">
                <h5 className='mb-0'>{titulo}</h5>
            </div>
            <div className="py-2 bd-highlight">
                <Link
                    to={{
                        pathname: `${rota}`,
                    }}
                    className='btn btn-success'
                >
                    {textoBotao}
                </Link>
            </div>
        </div>
    )
}