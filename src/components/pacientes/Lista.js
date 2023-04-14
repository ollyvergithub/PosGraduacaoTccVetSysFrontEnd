import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {dataFormatada, numeroFormatado} from "../../Utils";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {ModalConfirmaExclusao} from "../modalBootstrap/ModalConfirmaExclusao";

export const Lista = ({
                          registros,
                          excluirRegistro,
                          setRegistroParaExcluir,
                          showExibeModalExcluir,
                          setShowExibeModalExcluir
                      }) => {

    const rowsPerPage = 2;

    const dataTemplate = (rowData) => {
        return dataFormatada(rowData.data_nasc)
    }

    const pesoTemplate = (rowData) => {
        let peso = 'N/I'
        if (rowData && rowData.peso) {
            let peso_formatado = numeroFormatado(rowData.peso)
            peso = `${peso_formatado}KG`
        }
        return peso
    }

    const editarTemplate = (rowData) => {
        return (
            <Link
                to={{
                    pathname: `/edicao-de-paciente/${rowData['uuid']}`,
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
            {registros && registros.length > 0 ?
                <DataTable
                    value={registros}
                    tableStyle={{minWidth: '50rem'}}
                    showGridlines
                    paginator={registros.length > rowsPerPage}
                    rows={rowsPerPage}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink"
                >
                    <Column field='id' header='Id'/>
                    <Column field='nome' header='Nome'/>
                    <Column field='especie_detail.nome' header='Espécie'/>
                    <Column field='raca_detail.nome' header='Raça'/>
                    <Column
                        field='data_nasc'
                        header='Data Nasc.'
                        body={dataTemplate}
                    />
                    <Column
                        field='peso'
                        header='Peso'
                        body={pesoTemplate}
                    />
                    <Column field='tutor_detail.nome' header='Cliente'/>
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
                <p>Nenhum paciente encontrado</p>
            }
            <section>
                <ModalConfirmaExclusao
                    show={showExibeModalExcluir}
                    handleClose={() => setShowExibeModalExcluir(false)}
                    titulo="Excluir paciente"
                    texto={`<p>Deseja realmente excluir o paciente.</p>`}
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