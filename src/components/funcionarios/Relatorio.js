import React from "react";

export const Relatorio = ({relatorioPdf, funcionarios}) => {
    return(
        <>
            {funcionarios && funcionarios.length > 0 &&
                <div className="row">
                    <div className="col-md-8">
                        <h5 className='mb-0'>Gerar Relatório em PDF dos funcionários listados</h5>
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