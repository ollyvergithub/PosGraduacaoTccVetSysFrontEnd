import React from "react";

export const Relatorio = ({relatorioPdf, clientes}) => {
    return(
        <>
            {clientes && clientes.length > 0 &&
                <div className="row">
                    <div className="col-md-8">
                        <h5 className='mb-0'>Gerar Relatório em PDF dos clientes listados</h5>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <button
                            className='btn btn-info'
                            onClick={relatorioPdf}
                        >
                            Gerar Relatório em PDF
                        </button>
                    </div>
                    <hr className='separacao'/>
                </div>
            }
        </>

    )
}