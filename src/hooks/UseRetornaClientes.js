import {useEffect, useState} from "react";
import {getClientes} from "../services/clientes/Clientes.service";

export const UseRetornaClientes = () => {
    const [clientes, setClientes] = useState([])

    useEffect(()=>{

        let mounted = true;

        const buscaClientes = async () => {
            let clientes =  await getClientes()
            if (mounted){
                setClientes(clientes)
            }
        };
        buscaClientes()
            .catch(console.error);

        return () =>{
            mounted = false;
        }
    }, [])

    return clientes
  
}