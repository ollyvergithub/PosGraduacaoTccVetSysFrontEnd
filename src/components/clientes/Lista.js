import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ModalConfirmaExclusao} from "../modalBootstrap/ModalConfirmaExclusao";


export const Lista = ({
                          clientes,
                          excluirRegistro,
                          setRegistroParaExcluir,
                          showExibeModalExcluir,
                          setShowExibeModalExcluir
                      }) => {

    const rowsPerPage =  10;

    const pacientesTemplate = (rowData) => {
        let pacientes = ''

        if (rowData && rowData.paciente_detail && rowData.paciente_detail.length > 0) {
            rowData.paciente_detail.map((paciente) =>
                pacientes += `<p class="mb-0">${paciente.nome}</p>`
            )
        }
        return (
            <div
                dangerouslySetInnerHTML={{__html: pacientes}}
            />
        )
    }

    const editarTemplate = (rowData) => {
        return (
            <Link
                to={{
                    pathname: `/edicao-de-cliente/${rowData['uuid']}`,
                }}
                className="btn btn-link"
            >
                <FontAwesomeIcon
                    style={{marginRight: "3px", color: '#0C7441', fontSize: "1.2rem"}}
                    icon={faEdit}
                />
            </Link>
        )
    }

    const excluirTemplate = (rowData) => {
        return (
            <button
                onClick={() => onDeleteRegistro(rowData)}
                className="btn btn-link dropdown-item fonte-14"
                type="button"
            >
                <FontAwesomeIcon
                    style={{marginRight: "3px", color: '#B40C02', fontSize: "1.2rem"}}
                    icon={faTrashCan}
                />
            </button>
        )
    }

    const onDeleteRegistro = (rowData) => {
        setRegistroParaExcluir(rowData)
        setShowExibeModalExcluir(true)
    }

    return (
        <>
            {clientes && clientes.length > 0 ?
                <DataTable
                    value={clientes}
                    tableStyle={{minWidth: '50rem'}}
                    showGridlines
                    paginator={clientes.length > rowsPerPage}
                    rows={rowsPerPage}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                >
                    <Column field='id' header='Id'/>
                    <Column field='nome' header='Nome'/>
                    <Column field='cpf' header='CPF'/>
                    <Column field='sexo' header='Sexo'/>
                    <Column field='ddd' header='DDD'/>
                    <Column field='telefone' header='Telefone'/>
                    <Column
                        field='paciente'
                        header='Pacientes'
                        body={pacientesTemplate}
                    />
                    <Column
                        field='editar'
                        header='Editar'
                        body={editarTemplate}
                    />
                    <Column
                        field='excluir'
                        header='Excluir'
                        body={excluirTemplate}
                    />
                </DataTable>
                :
                <p>Nenhum cliente encontrado</p>
            }

            <section>
                <ModalConfirmaExclusao
                    show={showExibeModalExcluir}
                    handleClose={() => setShowExibeModalExcluir(false)}
                    titulo="Excluir cliente"
                    texto={`<p>Deseja realmente excluir o clliente.</p>`}
                    primeiroBotaoTexto="Fechar"
                    primeiroBotaoCss="success"
                    segundoBotaoTexto="Excluir"
                    segundoBotaoCss="danger"
                    segundoBotaoOnclick={excluirRegistro}
                />
            </section>
        </>
    )

}