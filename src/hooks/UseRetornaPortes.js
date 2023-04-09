import {useEffect, useState} from "react";
import {getPortes} from "../services/pacientes/Pacientes.service";

export const UseRetornaPortes = () => {
    const [portes, setPortes] = useState([])

    useEffect(()=>{

        let mounted = true;

        const buscaPortes = async () => {
            let portes =  await getPortes()
            if (mounted){
                setPortes(portes)
            }
        };
        buscaPortes()
            .catch(console.error);

        return () =>{
            mounted = false;
        }
    }, [])

    return portes
  
}