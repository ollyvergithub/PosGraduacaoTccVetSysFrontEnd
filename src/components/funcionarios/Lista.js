import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ModalConfirmaExclusao} from "../modalBootstrap/ModalConfirmaExclusao";

export const Lista = ({
                          funcionarios,
                          excluirRegistro,
                          setRegistroParaExcluir,
                          showExibeModalExcluir,
                          setShowExibeModalExcluir
                      }) => {

    const rowsPerPage = 10;

    const editarTemplate = (rowData) => {
        return (
            <Link
                to={{
                    pathname: `/edicao-de-funcionario/${rowData['uuid']}`,
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
            {funcionarios && funcionarios.length > 0 ?
                <DataTable
                    value={funcionarios}
                    tableStyle={{minWidth: '50rem'}}
                    showGridlines
                    paginator={funcionarios.length > rowsPerPage}
                    rows={rowsPerPage}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                >
                    <Column field='id' header='Id'/>
                    <Column field='nome' header='Nome'/>
                    <Column field='cpf' header='CPF'/>
                    <Column field='rg' header='RG'/>
                    <Column field='sexo' header='Sexo'/>
                    <Column field='telefone' header='Telefone'/>
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
                <p>Nenhum funcionário encontrado</p>
            }

            <section>
                <ModalConfirmaExclusao
                    show={showExibeModalExcluir}
                    handleClose={() => setShowExibeModalExcluir(false)}
                    titulo="Excluir funcionário"
                    texto={`<p>Deseja realmente excluir o funcionário.</p>`}
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