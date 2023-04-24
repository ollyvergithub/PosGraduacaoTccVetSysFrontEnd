import React from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ModalConfirmaExclusao} from "../modalBootstrap/ModalConfirmaExclusao";
import {dataFormatada} from "../../Utils";


export const Lista = ({
                          consultas,
                          excluirRegistro,
                          setRegistroParaExcluir,
                          showExibeModalExcluir,
                          setShowExibeModalExcluir
                      }) => {

    const rowsPerPage =  10;

    const dataTemplate = (rowData) => {
        return dataFormatada(rowData.data_da_consulta)
    }

    const editarTemplate = (rowData) => {
        return (
            <Link
                to={{
                    pathname: `/edicao-de-consulta/${rowData['uuid']}`,
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
            {consultas && consultas.length > 0 ?
                <DataTable
                    value={consultas}
                    tableStyle={{minWidth: '50rem'}}
                    showGridlines
                    paginator={consultas.length > rowsPerPage}
                    rows={rowsPerPage}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                >
                    <Column field='id' header='Id'/>
                    <Column
                        field='data_da_consulta'
                        header='Data da Consulta'
                        body={dataTemplate}
                    />
                    <Column field='paciente_detail.nome' header='Paciente'/>
                    <Column field='cliente_detail.nome' header='Cliente'/>
                    <Column field='veterinario_detail.nome' header='Veterinário'/>
                    <Column field='tipo_de_consulta' header='Tipo de Consulta'/>
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
                <p>Nenhuma consulta encontrada</p>
            }

            <section>
                <ModalConfirmaExclusao
                    show={showExibeModalExcluir}
                    handleClose={() => setShowExibeModalExcluir(false)}
                    titulo="Excluir consulta"
                    texto={`<p>Deseja realmente excluir a consulta.</p>`}
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