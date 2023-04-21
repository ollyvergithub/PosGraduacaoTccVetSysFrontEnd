import React, {useState} from "react";

export const Filtros = ({buscarClientes, pacientes, }) => {

    const initialState = {
        filtrar_por_nome: "",
        filtrar_por_cpf: "",
        filtrar_por_telefone: "",
        filtrar_por_paciente: "",
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
        await buscarClientes(stateFiltros.filtrar_por_nome, stateFiltros.filtrar_por_cpf, stateFiltros.filtrar_por_telefone, stateFiltros.filtrar_por_paciente)
    }

    const limparFiltros = async () => {
        setStateFiltros(initialState)
        await buscarClientes()
    }

    return (

        <form onSubmit={handleSubmitFiltros}>
            <div className='row mb-4'>
                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_nome">Filtrar por nome</label>
                    <input
                        value={stateFiltros.filtrar_por_nome}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_nome"
                        id="filtrar_por_nome"
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por nome de cliente"
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_cpf">Filtrar por cpf</label>
                    <input
                        value={stateFiltros.filtrar_por_cpf}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_cpf"
                        id="filtrar_por_cpf"
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por cpf de cliente"
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_telefone">Filtrar por telefone</label>
                    <input
                        value={stateFiltros.filtrar_por_telefone}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_telefone"
                        id="filtrar_por_telefone"
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por telefone de cliente"
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