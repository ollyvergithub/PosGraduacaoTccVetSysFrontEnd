import {useEffect, useState} from "react";
import {getRacas} from "../services/pacientes/Pacientes.service";

export const UseRetornaRacas = () => {
    const [racas, setRacas] = useState([])

    useEffect(()=>{

        let mounted = true;
        const buscaRacas = async () => {
            let racas =  await getRacas()
            setRacas(racas)
            if (mounted){
                setRacas(racas)
            }
        };
        buscaRacas()
            .catch(console.error);

        return () =>{
            mounted = false;
        }
    }, [])

    return racas
  
}