import React from "react";
import {useParams} from "react-router-dom";

export const PacienteForm = (props) => {
    let {uuid} = useParams();
    console.log("PPPPPPPPPPPP PacienteForm PacienteForm ", uuid)

    return(
        <>Componente PacienteForm</>
    )
  
}