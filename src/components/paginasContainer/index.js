import React from "react";
import "./paginas-container.scss"
import {Cabecalho} from "../cabecalho";
import {Rodape} from "../rodape";

export const PaginasContainer = ({children}) => {
    return(
        <>
            <div className='col-12'>
                <Cabecalho/>
                {children}
                <Rodape/>
            </div>
        </>
    )

}