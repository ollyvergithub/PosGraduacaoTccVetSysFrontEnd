import React, {useState} from "react";

export const Filtros = ({buscaFuncionarios}) => {

    const initialState = {
        filtrar_por_nome: "",
        filtrar_por_cpf: "",
        filtrar_por_rg: "",
        filtrar_por_telefone: "",
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
        await buscaFuncionarios(stateFiltros.filtrar_por_nome, stateFiltros.filtrar_por_cpf, stateFiltros.filtrar_por_rg, stateFiltros.filtrar_por_telefone)
    }

    const limparFiltros = async () => {
        setStateFiltros(initialState)
        await buscaFuncionarios()
    }

    return (
        <div className="accordion mb-5" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed fonte-16" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Filtros
                    </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
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
                                        placeholder="Filtrar por nome de funcionário"
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
                                        placeholder="Filtrar por cpf de funcionário"
                                    />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="filtrar_por_rg">Filtrar por rg</label>
                                    <input
                                        value={stateFiltros.filtrar_por_rg}
                                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                                        name="filtrar_por_rg"
                                        id="filtrar_por_rg"
                                        type="text"
                                        className="form-control"
                                        placeholder="Filtrar por rg de funcionário"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label" htmlFor="filtrar_por_telefone">Filtrar por
                                        telefone</label>
                                    <input
                                        value={stateFiltros.filtrar_por_telefone}
                                        onChange={(e) => handleChangeFiltros(e.target.name, e.target.value)}
                                        name="filtrar_por_telefone"
                                        id="filtrar_por_telefone"
                                        type="text"
                                        className="form-control"
                                        placeholder="Filtrar por telefone de funcionário"
                                    />
                                </div>

                                <div className="d-flex justify-content-end mt-3">

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
                    </div>
                </div>
            </div>
        </div>
    )

}