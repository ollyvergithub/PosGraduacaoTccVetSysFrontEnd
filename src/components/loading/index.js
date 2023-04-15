import React from "react";
import ReactLoading from "react-loading";

const Loading = (parametros) =>{
    const {corGrafico, corFonte, marginTop, marginBottom, texto='Carregando...'} = {...parametros}
    return(
        <div className = {`d-flex justify-content-center mt-${marginTop} mb-${marginBottom}`}>
            <div className="d-flex flex-column">
                <ReactLoading type={"bars"} color={corGrafico}/>
                <p className ={`ml-n3 text-${corFonte}`}>{texto}</p>
            </div>
        </div>
    )

}

export default Loading;