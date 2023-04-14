import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Formik} from 'formik';
import {PaginasContainer} from "../paginasContainer";
import {YupValidation} from "./YupValidation";
import useRetornaEspecies from "../../hooks/UseRetornaEspecies";
import {UseRetornaClientes} from "../../hooks/UseRetornaClientes";
import {UseRetornaRacas} from "../../hooks/UseRetornaRacas";
import {DatePickerField} from "../datePickerField";
import {UseRetornaPortes} from "../../hooks/UseRetornaPortes";
import moment from "moment";
import {patchPaciente, postPaciente, retrievePaciente} from "../../services/pacientes/Pacientes.service";
import {trataNumericos} from "../../Utils";
import {ModalSucesso} from "../modalBootstrap/ModalSucesso";

export const PacienteForm = () => {
    let {uuid} = useParams();
    const navigate = useNavigate();

    const inital = {
        cor: "",
        data_nasc: "",
        descricao: "",
        especie: '',
        nome: "",
        pelagem: "",
        peso: "",
        porte: "",
        raca: '',
        sexo: "",
        tutor: "",
    }

    const [initalState, setInitalState] = useState(inital)
    const [bloqueiaBtnSalvar, setBloqueiaBtnSalvar] = useState(false)
    const [showExibeModalSucesso, setShowExibeModalSucesso] = useState(false)

    const carregaPaciente = useCallback(async () => {
        if (uuid){
            let paciente = await retrievePaciente(uuid)
            setInitalState(paciente)
        }
    }, [uuid])

    useEffect(()=>{
        carregaPaciente()
    },[carregaPaciente])

    const especies = useRetornaEspecies()
    const clientes = UseRetornaClientes()
    const racas = UseRetornaRacas()
    const portes = UseRetornaPortes()

    const getPath = () => {
        navigate("/pacientes")
    }
    const handleSubmit = async (values) => {

        try {
            if (values.data_nasc){
                values.data_nasc = moment(values.data_nasc).format("YYYY-MM-DD")
            }else {
                values.data_nasc = undefined
            }

            if (values.peso){
                values.peso = trataNumericos(values.peso)
            }else {
                values.peso = undefined
            }

            const payload = {
                ...values
            }
            setShowExibeModalSucesso(true)
            if (uuid){
                await patchPaciente(uuid, payload)
                setBloqueiaBtnSalvar(true)
            }else {
                await postPaciente(payload)
                setBloqueiaBtnSalvar(true)
            }
        }catch (e) {
            setBloqueiaBtnSalvar(false)
            setShowExibeModalSucesso(false)
            console.log("Erro ao cadastrar paciente ", e)
        }
    }

    return (
        <PaginasContainer>
            <div className='container mb-3'>
                <h5 className='mb-0'>Cadastro de Pacientes</h5>
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
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        onChange={handleChange}
                                        value={values.nome}
                                        className="form-control"
                                    />
                                    {errors.nome && touched.nome && errors.nome &&
                                        <span className="span_erro text-danger mt-1"> {errors.nome} </span>
                                    }
                                </div>
                                <div className='col-md-4 mt-3'>
                                    <label htmlFor="especie" className="form-label">Espécie</label>
                                    <select
                                        value={values.especie}
                                        onChange={handleChange}
                                        name="especie"
                                        id="especie"
                                        className="form-select"
                                    >
                                        <option value=''>Selecione uma espécie</option>
                                        {especies && especies.length > 0 && especies.map(item => (
                                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-4 mt-3'>
                                    <label htmlFor="raca" className="form-label">Raça</label>
                                    <select
                                        value={values.raca}
                                        onChange={handleChange}
                                        name="raca"
                                        id="raca"
                                        className="form-select"
                                    >
                                        <option value=''>Selecione uma raça</option>
                                        {racas && racas.length > 0 && racas.map(item => (
                                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="data_nasc" className="form-label">Data de nascimento</label>
                                    <DatePickerField
                                        name="data_nasc"
                                        id="data_nasc"
                                        value={values.data_nasc}
                                        onChange={setFieldValue}
                                        maxDate={new Date()}
                                    />
                                    {errors.data_nasc && touched.data_nasc && errors.data_nasc &&
                                        <span className="span_erro text-danger mt-1"> {errors.data_nasc} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="peso" className="form-label">Peso</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="peso"
                                        id='peso'
                                        onChange={handleChange}
                                        value={values.peso}
                                        className="form-control"
                                    />
                                    {errors.peso && touched.peso && errors.peso &&
                                        <span className="span_erro text-danger mt-1"> {errors.peso} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="porte" className="form-label">Porte</label>
                                    <select
                                        value={values.porte}
                                        onChange={handleChange}
                                        name="porte"
                                        id="porte"
                                        className="form-select"
                                    >
                                        <option value=''>Selecione um porte</option>
                                        {portes && portes.length > 0 && portes.map(item => (
                                            <option key={item.uuid} value={item.uuid}>{item.get_porte_display}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="cor" className="form-label">Cor</label>
                                    <input
                                        type="text"
                                        name="cor"
                                        id="cor"
                                        onChange={handleChange}
                                        value={values.cor}
                                        className="form-control"
                                    />
                                    {errors.cor && touched.cor && errors.cor &&
                                        <span className="span_erro text-danger mt-1"> {errors.cor} </span>
                                    }
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4 mt-3'>
                                    <label htmlFor="tutor" className="form-label">Cliente</label>
                                    <select
                                        value={values.tutor}
                                        onChange={handleChange}
                                        name="tutor"
                                        id="tutor"
                                        className="form-select"
                                    >
                                        <option value=''>Selecione um cliente</option>
                                        {clientes && clientes.length > 0 && clientes.map(item => (
                                            <option key={item.uuid} value={item.uuid}>{item.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-4 mt-3'>
                                    <label htmlFor="pelagem" className="form-label">Pelagem</label>
                                    <input
                                        type="text"
                                        name="pelagem"
                                        id="pelagem"
                                        onChange={handleChange}
                                        value={values.pelagem}
                                        className="form-control"
                                    />
                                    {errors.pelagem && touched.pelagem && errors.pelagem &&
                                        <span className="span_erro text-danger mt-1"> {errors.pelagem} </span>
                                    }
                                </div>

                                <div className='col-md-4 mt-3'>
                                    <label htmlFor="sexo" className="form-label">Sexo</label>
                                    <select
                                        value={values.sexo}
                                        onChange={handleChange}
                                        name="sexo"
                                        id="sexo"
                                        className="form-select"
                                    >
                                        <option value=''>Selecione um sexo</option>
                                        <option value='MACHO'>Macho</option>
                                        <option value='FEMEA'>Fêmea</option>

                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12 mt-3'>
                                    <label htmlFor="descricao" className="form-label">Descrição/Observações</label>
                                    <textarea
                                        name='descricao'
                                        id='descricao'
                                        value={values.descricao}
                                        onChange={handleChange}
                                        className="form-control"
                                        rows="3"
                                    />
                                </div>

                                <div className='d-flex justify-content-end pb-3 mt-3'>

                                    <Link to="/pacientes" state={{origem: 'edicao'}}>
                                        <button
                                            type="button"
                                            disabled={isSubmitting || bloqueiaBtnSalvar}
                                            className="btn btn-outline-success me-2"
                                        >
                                            Voltar
                                        </button>
                                    </Link>

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
                                    titulo={uuid ? "Paciente editado com sucesso" : "Paciente criado com sucesso"}
                                    texto={uuid ? "O Paciente foi editado com sucesso." : "O Paciente foi criado com sucesso."}
                                    primeiroBotaoTexto="Fechar"
                                    primeiroBotaoCss="success"
                                />
                            </section>
                        </form>
                    )}
                </Formik>
            </div>
        </PaginasContainer>
    )

}