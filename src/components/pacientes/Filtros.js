import React, {useState} from "react";

export const Filtros = ({clientes, especies, racas, buscarPacientes}) => {

    const initialState = {
        filtrar_por_nome: "",
        filtrar_por_cliente: "",
        filtrar_por_especie: "",
        filtrar_por_raca: "",
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
        await buscarPacientes(stateFiltros.filtrar_por_nome, stateFiltros.filtrar_por_cliente, stateFiltros.filtrar_por_especie, stateFiltros.filtrar_por_raca)
    }

    const limparFiltros = async () => {
        setStateFiltros(initialState)
        await buscarPacientes()
    }

    return (

        <form onSubmit={handleSubmitFiltros}>
            <div className='row mb-4'>
                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_nome">Filtrar nome</label>
                    <input
                        value={stateFiltros.filtrar_por_nome}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_nome"
                        id="filtrar_por_nome"
                        type="text"
                        className="form-control"
                        placeholder="Filtrar por nome de paciente"
                    />
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
                    <label className="form-label" htmlFor="filtrar_por_especie">Filtrar por espécie</label>
                    <select
                        value={stateFiltros.filtrar_por_especie}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_especie"
                        id="filtrar_por_especie"
                        className="form-select"
                    >
                        <option value=''>Selecione uma espécie</option>
                        {especies && especies.length > 0 && especies.map(item => (
                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label" htmlFor="filtrar_por_raca">Filtrar por raça</label>
                    <select
                        value={stateFiltros.filtrar_por_raca}
                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                        name="filtrar_por_raca"
                        id="filtrar_por_raca"
                        className="form-select"
                    >
                        <option value=''>Selecione uma raça</option>
                        {racas && racas.length > 0 && racas.map(item => (
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