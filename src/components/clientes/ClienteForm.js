import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import {Formik} from 'formik';
import {PaginasContainer} from "../paginasContainer";
import {YupValidation} from "./YupValidation";
import {UseRetornaPacientes} from "../../hooks/UseRetornaPacientes";
import {DatePickerField} from "../datePickerField";
import {ModalSucesso} from "../modalBootstrap/ModalSucesso";
import useRetornaEspecies from "../../hooks/UseRetornaEspecies";
import moment from "moment/moment";
import './multiselect.scss'
import { Select, Space } from 'antd';
import {patchCliente, postCliente, retrieveCliente} from "../../services/clientes/Clientes.service";
import {retrievePaciente} from "../../services/pacientes/Pacientes.service";


export const ClienteForm = () => {
    let {uuid} = useParams();
    const navigate = useNavigate();
    const pacientes = UseRetornaPacientes()

    const options = [];
    for (let i = 0; i < pacientes.length; i++) {
        options.push({
            label: `${pacientes[i].id} - ${pacientes[i].nome}`,
            value: pacientes[i].id,
        });
    }

    const { Option } = Select;

    const initial = {
        nome: '',
        cpf: '',
        sexo: '',
        paciente:[],
        tipo_logradouro:'',
        logradouro:'',
        numero:'',
        bairro:'',
        complemento:'',
        cep:'',
        ddd:'',
        telefone:'',
        ddd_segundo_telefone:'',
        segundo_telefone:'',
        data_de_nascimento: "",
        email: "",
        descricao: "",
    }

    const [initalState, setInitalState] = useState(initial)
    const [bloqueiaBtnSalvar, setBloqueiaBtnSalvar] = useState(false)
    const [showExibeModalSucesso, setShowExibeModalSucesso] = useState(false)
    const [selectedPacientes, setSelectedPacientes] = useState([]);

    const carregaCliente = useCallback(async () => {
        if (uuid) {
            let cliente = await retrieveCliente(uuid)
            setInitalState(cliente)
            setSelectedPacientes(cliente.paciente)
        }
    }, [uuid])

    useEffect(() => {
        carregaCliente()
    }, [carregaCliente])

    const handleChangeSelectStatusPc =  async (value) => {
        setSelectedPacientes([...value]);
    }

    const getPath = () => {
        navigate("/clientes")
    }
    const handleSubmit = async (values) => {
        try {
            if (values.data_de_nascimento) {
                values.data_de_nascimento = moment(values.data_de_nascimento).format("YYYY-MM-DD")
            } else {
                values.data_de_nascimento = undefined
            }

            values.paciente = selectedPacientes

            const payload = {
                ...values
            }

            setShowExibeModalSucesso(true)

            if (uuid){
                await patchCliente(uuid, payload)
                setBloqueiaBtnSalvar(true)
            }else {
                await postCliente(payload)
                setBloqueiaBtnSalvar(true)
            }

        }catch (e) {
            setBloqueiaBtnSalvar(false)
            console.log("Erro ao cadastrar cliente ", e)
        }
    }

    return(
        <PaginasContainer>
            <div className='container mb-3'>
                <h5 className='mb-0'>Cadastro de Clientes</h5>
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
                                <div className='col-md-3 mt-3'>
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
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="cpf" className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        name="cpf"
                                        id="cpf"
                                        onChange={handleChange}
                                        value={values.cpf}
                                        className="form-control"
                                    />
                                    {errors.cpf && touched.cpf && errors.cpf &&
                                        <span className="span_erro text-danger mt-1"> {errors.cpf} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="data_de_nascimento" className="form-label">Data de nascimento</label>
                                    <DatePickerField
                                        name="data_de_nascimento"
                                        id="data_de_nascimento"
                                        value={values.data_de_nascimento}
                                        onChange={setFieldValue}
                                        maxDate={new Date()}
                                    />
                                    {errors.data_de_nascimento && touched.data_de_nascimento && errors.data_de_nascimento &&
                                        <span className="span_erro text-danger mt-1"> {errors.data_de_nascimento} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="sexo" className="form-label">Sexo</label>
                                    <select
                                        value={values.sexo}
                                        onChange={handleChange}
                                        name="sexo"
                                        id="sexo"
                                        className="form-select"
                                    >
                                        <option value='FEMININO'>Feminino</option>
                                        <option value='MASCULINO'>Masculino</option>
                                    </select>
                                </div>
                            </div>

                            <div className='row'>

                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        value={values.email}
                                        className="form-control"
                                    />
                                    {errors.email && touched.email && errors.email &&
                                        <span className="span_erro text-danger mt-1"> {errors.email} </span>
                                    }
                                </div>

                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="paciente" className="form-label">Pacientes</label>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Selecione os status"
                                        value={selectedPacientes}
                                        onChange={handleChangeSelectStatusPc}
                                        className='multiselect-filtrar-por-status'
                                        options={options}
                                    >
                                        <Option value='TODOS'>Todos</Option>
                                        {pacientes && pacientes.length > 0 && pacientes.map(item => (
                                            <Option key={item.id} value={item.id}>{item.nome}</Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="tipo_logradouro" className="form-label">Tipo de Logradouro</label>
                                    <input
                                        type="text"
                                        name="tipo_logradouro"
                                        id="tipo_logradouro"
                                        onChange={handleChange}
                                        value={values.tipo_logradouro}
                                        className="form-control"
                                    />
                                    {errors.tipo_logradouro && touched.tipo_logradouro && errors.tipo_logradouro &&
                                        <span className="span_erro text-danger mt-1"> {errors.tipo_logradouro} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="logradouro" className="form-label">Logradouro</label>
                                    <input
                                        type="text"
                                        name="logradouro"
                                        id="logradouro"
                                        onChange={handleChange}
                                        value={values.logradouro}
                                        className="form-control"
                                    />
                                    {errors.logradouro && touched.logradouro && errors.logradouro &&
                                        <span className="span_erro text-danger mt-1"> {errors.logradouro} </span>
                                    }
                                </div>

                            </div>
                            <div className='row'>

                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="numero" className="form-label">Número</label>
                                    <input
                                        type="text"
                                        name="numero"
                                        id="numero"
                                        onChange={handleChange}
                                        value={values.numero}
                                        className="form-control"
                                    />
                                    {errors.numero && touched.numero && errors.numero &&
                                        <span className="span_erro text-danger mt-1"> {errors.numero} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="bairro" className="form-label">Bairro</label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        id="bairro"
                                        onChange={handleChange}
                                        value={values.bairro}
                                        className="form-control"
                                    />
                                    {errors.bairro && touched.bairro && errors.bairro &&
                                        <span className="span_erro text-danger mt-1"> {errors.bairro} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="complemento" className="form-label">Complemento</label>
                                    <input
                                        type="text"
                                        name="complemento"
                                        id="complemento"
                                        onChange={handleChange}
                                        value={values.complemento}
                                        className="form-control"
                                    />
                                    {errors.complemento && touched.complemento && errors.complemento &&
                                        <span className="span_erro text-danger mt-1"> {errors.complemento} </span>
                                    }
                                </div>

                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="cep" className="form-label">CEP</label>
                                    <input
                                        type="text"
                                        name="cep"
                                        id="cep"
                                        onChange={handleChange}
                                        value={values.cep}
                                        className="form-control"
                                    />
                                    {errors.cep && touched.cep && errors.cep &&
                                        <span className="span_erro text-danger mt-1"> {errors.cep} </span>
                                    }
                                </div>


                            </div>

                            <div className='row'>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="ddd" className="form-label">DDD</label>
                                    <input
                                        type="text"
                                        name="ddd"
                                        id="ddd"
                                        onChange={handleChange}
                                        value={values.ddd}
                                        className="form-control"
                                    />
                                    {errors.ddd && touched.ddd && errors.ddd &&
                                        <span className="span_erro text-danger mt-1"> {errors.ddd} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="telefone" className="form-label">Telefone</label>
                                    <input
                                        type="text"
                                        name="telefone"
                                        id="telefone"
                                        onChange={handleChange}
                                        value={values.telefone}
                                        className="form-control"
                                    />
                                    {errors.telefone && touched.telefone && errors.telefone &&
                                        <span className="span_erro text-danger mt-1"> {errors.telefone} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="ddd_segundo_telefone" className="form-label">DDD</label>
                                    <input
                                        type="text"
                                        name="ddd_segundo_telefone"
                                        id="ddd_segundo_telefone"
                                        onChange={handleChange}
                                        value={values.ddd_segundo_telefone}
                                        className="form-control"
                                    />
                                    {errors.ddd_segundo_telefone && touched.ddd_segundo_telefone && errors.ddd_segundo_telefone &&
                                        <span className="span_erro text-danger mt-1"> {errors.ddd_segundo_telefone} </span>
                                    }
                                </div>
                                <div className='col-md-3 mt-3'>
                                    <label htmlFor="segundo_telefone" className="form-label">Telefone</label>
                                    <input
                                        type="text"
                                        name="segundo_telefone"
                                        id="segundo_telefone"
                                        onChange={handleChange}
                                        value={values.segundo_telefone}
                                        className="form-control"
                                    />
                                    {errors.segundo_telefone && touched.segundo_telefone && errors.segundo_telefone &&
                                        <span className="span_erro text-danger mt-1"> {errors.segundo_telefone} </span>
                                    }
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
                            </div>



                            <div className='row'>

                                <div className='d-flex justify-content-end pb-3 mt-3'>

                                    <Link to="/clientes" state={{origem: 'edicao'}}>
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
                                    titulo={uuid ? "Cliente editado com sucesso" : "Cliente criado com sucesso"}
                                    texto={uuid ? "O Cliente foi editado com sucesso." : "O Cliente foi criado com sucesso."}
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