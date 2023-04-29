import React, {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {UseRetornaPacientes} from "../../hooks/UseRetornaPacientes";
import moment from "moment";
import {
    gerarRelatorioPdf,
    patchConsulta,
    postConsulta,
    retrieveConsulta
} from "../../services/consultas/Consultas.service";
import {PaginasContainer} from "../paginasContainer";
import {Formik} from 'formik';
import {YupValidation} from "./YupValidation";
import {DatePickerField} from "../datePickerField";
import {UseRetornaClientes} from "../../hooks/UseRetornaClientes";
import {UseRetornaVeterinarios} from "../../hooks/UseRetornaVeterinarios";
import {ModalSucesso} from "../modalBootstrap/ModalSucesso";
import {ModalErro} from "../modalBootstrap/ModalErro";
import Loading from "../loading";
import {HistoricoDeConsultas} from "./HistoricoDeConsultas";

export const ConsultaForm = () => {
    let {uuid} = useParams();
    const navigate = useNavigate();
    const pacientes = UseRetornaPacientes()
    const clientes = UseRetornaClientes()
    const veterinarios = UseRetornaVeterinarios()

    const initial = {
        data_da_consulta: '',
        paciente: '',
        cliente: '',
        veterinario: '',
        tipo_de_consulta: '',
        ficha_clinica: '',
    }

    const [initalState, setInitalState] = useState(initial)
    const [bloqueiaBtnSalvar, setBloqueiaBtnSalvar] = useState(false)
    const [showExibeModalSucesso, setShowExibeModalSucesso] = useState(false)
    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pacienteUuid,setPacienteUuid] = useState('');

    const carregaConsulta = useCallback(async () => {
        if (uuid) {
            let consulta = await retrieveConsulta(uuid)
            setInitalState(consulta)
            setPacienteUuid(consulta.paciente)
        }
    }, [uuid])

    useEffect(() => {
        carregaConsulta()
    }, [carregaConsulta])

    const getPath = () => {
        navigate("/consultas")
    }

    const handleSubmit = async (values) => {
        try {
            if (values.data_da_consulta) {
                values.data_da_consulta = moment(values.data_da_consulta).format("YYYY-MM-DD")
            } else {
                values.data_da_consulta = undefined
            }

            const payload = {
                ...values
            }

            if (uuid) {
                await patchConsulta(uuid, payload)
                setBloqueiaBtnSalvar(true)
            } else {
                await postConsulta(payload)
                setBloqueiaBtnSalvar(true)
            }

            setShowExibeModalSucesso(true)

        } catch (e) {
            setBloqueiaBtnSalvar(false)
            console.log("Erro ao cadastrar consulta ", e)
            setShowExibeModalErro(true)
        }
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_consultas": [uuid],
            });
            setLoading(false)
        } catch (e) {
            console.log("Erro ao gerar relatório ", e)
        }
    };

    return (
        <PaginasContainer>
            {loading ? (
                    <Loading
                        corGrafico="black"
                        corFonte="dark"
                        marginTop="0"
                        marginBottom="0"
                        texto='Relatório sendo gerado, aguarde...'
                    />
                ) :
                <div className='container mb-3'>
                    <h5 className='mb-0'>Cadastro de Consultas</h5>
                    <Formik
                        initialValues={initalState}
                        onSubmit={handleSubmit}
                        validationSchema={YupValidation}
                        enableReinitialize={true}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              setFieldValue
                              /* and other goodies */
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="data_da_consulta" className="form-label">Data da consulta</label>
                                        <DatePickerField
                                            name="data_da_consulta"
                                            id="data_da_consulta"
                                            value={values.data_da_consulta}
                                            onChange={setFieldValue}
                                            maxDate={new Date()}
                                        />
                                        {errors.data_da_consulta && touched.data_da_consulta && errors.data_da_consulta &&
                                            <span className="span_erro text-danger mt-1"> {errors.data_da_consulta} </span>
                                        }
                                    </div>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="paciente" className="form-label">Paciente</label>
                                        <select
                                            value={values.paciente}
                                            onChange={(e)=> {
                                                handleChange(e)
                                                setPacienteUuid(e.target.value)
                                            }}
                                            name="paciente"
                                            id="paciente"
                                            className="form-select"
                                        >
                                            <option value=''>Selecione um paciente</option>
                                            {pacientes && pacientes.length > 0 && pacientes.map(item => (
                                                <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                                            ))}
                                        </select>
                                        {errors.paciente && touched.paciente && errors.paciente &&
                                            <span className="span_erro text-danger mt-1"> {errors.paciente} </span>
                                        }
                                    </div>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="cliente" className="form-label">Cliente</label>
                                        <select
                                            value={values.cliente}
                                            onChange={handleChange}
                                            name="cliente"
                                            id="cliente"
                                            className="form-select"
                                        >
                                            <option value=''>Selecione um cliente</option>
                                            {clientes && clientes.length > 0 && clientes.map(item => (
                                                <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                                            ))}
                                        </select>
                                        {errors.cliente && touched.cliente && errors.cliente &&
                                            <span className="span_erro text-danger mt-1"> {errors.cliente} </span>
                                        }
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="veterinario" className="form-label">Veterinário</label>
                                        <select
                                            value={values.veterinario}
                                            onChange={handleChange}
                                            name="veterinario"
                                            id="veterinario"
                                            className="form-select"
                                        >
                                            <option value=''>Selecione um veterinário</option>
                                            {veterinarios && veterinarios.length > 0 && veterinarios.map(item => (
                                                <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                                            ))}
                                        </select>
                                        {errors.veterinario && touched.veterinario && errors.veterinario &&
                                            <span className="span_erro text-danger mt-1"> {errors.veterinario} </span>
                                        }
                                    </div>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="tipo_de_consulta" className="form-label">Tipo de
                                            consulta</label>
                                        <select
                                            value={values.tipo_de_consulta}
                                            onChange={handleChange}
                                            name="tipo_de_consulta"
                                            id="tipo_de_consulta"
                                            className="form-select"
                                        >
                                            <option value=''>Selecione o tipo de consulta</option>
                                            <option value='NOVA'>Nova Consulta</option>
                                            <option value='RETORNO'>Retorno</option>
                                        </select>
                                        {errors.tipo_de_consulta && touched.tipo_de_consulta && errors.tipo_de_consulta &&
                                            <span className="span_erro text-danger mt-1"> {errors.tipo_de_consulta} </span>
                                        }
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col-12 mt-3'>
                                        <label htmlFor="ficha_clinica" className="form-label">Ficha Clínica</label>
                                        <textarea
                                            name='ficha_clinica'
                                            id='ficha_clinica'
                                            value={values.ficha_clinica}
                                            onChange={handleChange}
                                            className="form-control"
                                            rows="5"
                                        />
                                        {errors.ficha_clinica && touched.ficha_clinica && errors.ficha_clinica &&
                                            <span className="span_erro text-danger mt-1"> {errors.ficha_clinica} </span>
                                        }
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='d-flex justify-content-end pb-3 mt-3'>

                                        <Link to="/consultas" state={{origem: 'edicao'}}>
                                            <button
                                                type="button"
                                                disabled={isSubmitting || bloqueiaBtnSalvar}
                                                className="btn btn-outline-success me-2"
                                            >
                                                Voltar
                                            </button>
                                        </Link>

                                        {uuid &&
                                            <button
                                                type="button"
                                                disabled={isSubmitting || bloqueiaBtnSalvar}
                                                className="btn btn-info me-2"
                                                onClick={relatorioPdf}
                                            >
                                                Gerar Relatório em PDF
                                            </button>
                                        }

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || bloqueiaBtnSalvar}
                                            className="btn btn-success"
                                        >
                                            {uuid ? 'Editar' : 'Cadastrar'}
                                        </button>


                                    </div>
                                </div>

                                <section>
                                    <ModalSucesso
                                        show={showExibeModalSucesso}
                                        handleClose={() => getPath()}
                                        titulo={uuid ? "Consulta editada com sucesso" : "Consulta criada com sucesso"}
                                        texto={uuid ? "A Consulta foi editada com sucesso." : "A Consulta foi criada com sucesso."}
                                        primeiroBotaoTexto="Fechar"
                                        primeiroBotaoCss="success"
                                    />
                                </section>
                                <section>
                                    <ModalErro
                                        show={showExibeModalErro}
                                        handleClose={() => setShowExibeModalErro(false)}
                                        titulo={uuid ? "Erro ao editar a consulta" : "Erro ao cadastrar a consulta"}
                                        texto={uuid ? "<p>Não foi possível editar a consulta, tente novamente</p>" : "<p>Não foi possível cadastrar a consulta, tente novamente</p>"}
                                        primeiroBotaoTexto="Fechar"
                                        primeiroBotaoCss="success"
                                    />
                                </section>
                            </form>
                        )}
                    </Formik>
                    <HistoricoDeConsultas
                        pacienteUuid={pacienteUuid}
                        consultaUuid={uuid}
                    />
                </div>
            }
        </PaginasContainer>
    )

}