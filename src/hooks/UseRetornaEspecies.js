import {useEffect, useState} from "react";
import {getEspecies} from "../services/pacientes/Pacientes.service";

const useRetornaEspecies = () => {
    const [especies, setEspecies] = useState([])

    useEffect(()=>{

        let mounted = true;

        const buscaEspecies = async () => {
            let especies =  await getEspecies()
            if (mounted){
                setEspecies(especies)
            }
        };
        buscaEspecies()
            .catch(console.error);

        return () =>{
            mounted = false;
        }
    }, [])

    return especies
}
export default useRetornaEspecies