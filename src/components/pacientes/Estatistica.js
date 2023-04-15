import React from "react";

export const Estatisticas = ({estatisticas}) => {
    return(
        <div className="row pt-2 pb-1">
            <div className="col-md-8">
                <h5 className='mb-0'>Gerar estatísticas</h5>
            </div>
            <div className="col-md-4 text-md-end">
                <button
                    className='btn btn-info'
                    onClick={estatisticas}
                >
                    Gerar estatísticas
                </button>
            </div>
            <hr className='separacao'/>
        </div>
    )
}