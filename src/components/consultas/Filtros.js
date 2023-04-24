import React, {useState} from "react";
import {DatePickerField} from "../datePickerField";
import moment from "moment";

export const Filtros = ({buscarConsultas, pacientes, clientes, veterinarios}) => {

    const initialState = {
        filtrar_por_data_da_consulta: "",
        filtrar_por_paciente: "",
        filtrar_por_cliente: "",
        filtrar_por_veterinario: "",
    };

    const [stateFiltros, setStateFiltros] = useState(initialState);

    const handleChangeFiltros = (name, value) => {
        setStateFiltros({
            ...stateFiltros,
            [name]: value
        });
    };

    const handleSubmitFiltros = async (event) => {
        event.preventDefault();
        let data_da_consulta = stateFiltros.filtrar_por_data_da_consulta ? moment(new Date(stateFiltros.filtrar_por_data_da_consulta), "YYYY-MM-DD").format("YYYY-MM-DD") : null;
        await buscarConsultas(data_da_consulta, stateFiltros.filtrar_por_paciente, stateFiltros.filtrar_por_cliente, stateFiltros.filtrar_por_veterinario)
    }

    const limparFiltros = async () => {
        setStateFiltros(initialState)
        await buscarConsultas()
    }

    return (

        <form onSubmit={handleSubmitFiltros}>
            <div className='row mb-4'>
                <div className="col-md-3">
                    <label htmlFor="filtrar_por_data_da_consulta" className="form-label">Filtrar por data da consulta</label>
                    <DatePickerField
                        value={stateFiltros.filtrar_por_data_da_consulta}
                        onChange={handleChangeFiltros}
                        name="filtrar_por_data_da_consulta"
                        id="filtrar_por_data_da_consulta"
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_paciente">Filtrar por paciente</label>
                    <select
                        value={stateFiltros.filtrar_por_paciente}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_paciente"
                        id="filtrar_por_paciente"
                        className="form-select"
                    >
                        <option value=''>Selecione um paciente</option>
                        {pacientes && pacientes.length > 0 && pacientes.map(item => (
                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_cliente">Filtrar por cliente</label>
                    <select
                        value={stateFiltros.filtrar_por_cliente}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_cliente"
                        id="filtrar_por_cliente"
                        className="form-select"
                    >
                        <option value=''>Selecione um cliente</option>
                        {clientes && clientes.length > 0 && clientes.map(item => (
                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_veterinario">Filtrar por veterinário</label>
                    <select
                        value={stateFiltros.filtrar_por_veterinario}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_veterinario"
                        id="filtrar_por_veterinario"
                        className="form-select"
                    >
                        <option value=''>Selecione um veterinário</option>
                        {veterinarios && veterinarios.length > 0 && veterinarios.map(item => (
                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="d-flex justify-content-end pb-3 mt-3">

                    <button
                        onClick={() => limparFiltros()}
                        type="button"
                        className="btn btn-outline-success mt-2 me-2"
                    >
                        Limpar
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success mt-2"
                    >
                        Filtrar
                    </button>
                </div>
            </div>
        </form>
    )

}