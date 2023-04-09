import {useEffect, useState} from "react";
import {getClientes} from "../services/clientes/Clientes.service";
import {getPacientes} from "../services/pacientes/Pacientes.service";

export const UseRetornaPacientes = () => {
    const [pacientes, setPacientes] = useState([])

    useEffect(()=>{

        let mounted = true;

        const buscaPacientes = async () => {
            let pacientes =  await getPacientes()
            if (mounted){
                setPacientes(pacientes)
            }
        };
        buscaPacientes()
            .catch(console.error);

        return () =>{
            mounted = false;
        }
    }, [])

    return pacientes
  
}