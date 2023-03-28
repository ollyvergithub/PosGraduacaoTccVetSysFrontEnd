import React, {useEffect, useState} from "react";
import {getPacientes} from "../../services/pacientes/Pacientes.service";

export const Lista = () =>{
    const [pacientes, setPacientes] = useState([])

    useEffect(() => {
        let isSubscribed = true;

        // declare the async data fetching function
        const buscaPacientes = async () => {
            const pacientes = await getPacientes()

            // set state with the result if `isSubscribed` is true
            if (isSubscribed) {
                setPacientes(pacientes)
            }
        }

        // call the function
        buscaPacientes()
            // make sure to catch any error
            .catch(console.error);

        // cancel any future `setData`
        return () => isSubscribed = false;
    }, [])

    return(
        <div className='container'>
            <h1>Lista de Pacientes</h1>
            {pacientes && pacientes.length > 0 ?
                pacientes.map(paciente =>
                    <p key={paciente.uuid}>Nome: {paciente.nome}</p>
                )
                : <p>Nenhum paciente cadastrado aqui </p>
            }
        </div>
    )

}