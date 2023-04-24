import {useEffect, useState} from "react";
import {getVeterinarios} from "../services/veterinarios/Veterinarios.service";

export const UseRetornaVeterinarios = () => {
    const [veterinarios, setVeterinarios] = useState([])

    useEffect(()=>{

        let mounted = true;

        const buscaVeterinarios = async () => {
            let veterinarios =  await getVeterinarios()
            if (mounted){
                setVeterinarios(veterinarios)
            }
        };
        buscaVeterinarios()
            .catch(console.error);

        return () =>{
            mounted = false;
        }
    }, [])

    return veterinarios
  
}