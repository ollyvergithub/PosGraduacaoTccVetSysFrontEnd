import React, {useCallback, useEffect, useState} from "react";
import Loading from "../loading";
import {Formik} from "formik";
import {YupValidation} from "./YupValidation";
import MaskedInput from "react-text-mask";
import {DatePickerField} from "../datePickerField";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ModalSucesso} from "../modalBootstrap/ModalSucesso";
import {PaginasContainer} from "../paginasContainer";
import moment from "moment";
import {
    gerarRelatorioPdf,
    patchFuncionario,
    postFuncionario, retrieveFuncionario
} from "../../services/funcionarios/Funcionarios.service";

export const FuncionarioForm = () => {

    let {uuid} = useParams();
    const navigate = useNavigate();

    const initial = {
        nome: '',
        cpf: '',
        rg: '',
        sexo: '',
        tipo_logradouro: '',
        logradouro: '',
        numero: '',
        bairro: '',
        complemento: '',
        cep: '',
        telefone: '',
        data_de_nascimento: "",
        email: "",
        descricao: "",
    }

    const [initalState, setInitalState] = useState(initial)
    const [bloqueiaBtnSalvar, setBloqueiaBtnSalvar] = useState(false)
    const [showExibeModalSucesso, setShowExibeModalSucesso] = useState(false)
    const [loading, setLoading] = useState(false);

    const carregaFuncionario = useCallback(async () => {
        if (uuid) {
            let funcionario = await retrieveFuncionario(uuid)
            setInitalState(funcionario)
        }
    }, [uuid])

    useEffect(() => {
        carregaFuncionario()
    }, [carregaFuncionario])

    const handleSubmit = async (values) => {
        try {
            if (values.data_de_nascimento) {
                values.data_de_nascimento = moment(values.data_de_nascimento).format("YYYY-MM-DD")
            } else {
                values.data_de_nascimento = undefined
            }

            const payload = {
                ...values
            }

            setShowExibeModalSucesso(true)
            if (uuid) {
                await patchFuncionario(uuid, payload)
                setBloqueiaBtnSalvar(true)
            } else {
                await postFuncionario(payload)
                setBloqueiaBtnSalvar(true)
            }

        } catch (e) {
            setBloqueiaBtnSalvar(false)
            console.log("Erro ao cadastrar cliente ", e)
        }
    }

    const getPath = () => {
        navigate("/funcionarios")
    }

    const relatorioPdf = async () => {
        try {
            setLoading(true)
            await gerarRelatorioPdf({
                "uuids_administrativos": [uuid],
            });
            setLoading(false)
        } catch (e) {
            console.log("Erro ao gerar relatório ", e)
        }
    };

    return(
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
                                        <label htmlFor="cpf" className="form-label">CPF</label>

                                        <MaskedInput
                                            mask = {[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                            type="text"
                                            value={values.cpf}
                                            name="cpf"
                                            id="cpf"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                        {errors.cpf && touched.cpf && errors.cpf &&
                                            <span className="span_erro text-danger mt-1"> {errors.cpf} </span>
                                        }
                                    </div>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="rg" className="form-label">RG</label>
                                        <input
                                            type="text"
                                            name="rg"
                                            id="rg"
                                            onChange={handleChange}
                                            value={values.rg}
                                            className="form-control"
                                        />
                                        {errors.nome && touched.nome && errors.nome &&
                                            <span className="span_erro text-danger mt-1"> {errors.nome} </span>
                                        }
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col-md-4 mt-3'>
                                        <label htmlFor="data_de_nascimento" className="form-label">Data de nascimento</label>
                                        <DatePickerField
                                            name="data_de_nascimento"
                                            id="data_de_nascimento"
                                            value={values.data_de_nascimento}
                                            onChange={setFieldValue}
                                            maxDate={new Date()}
                                        />
                                        {errors.data_de_nascimento && touched.data_de_nascimento && errors.data_de_nascimento &&
                                            <span
                                                className="span_erro text-danger mt-1"> {errors.data_de_nascimento} </span>
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
                                            <option value='FEMININO'>Feminino</option>
                                            <option value='MASCULINO'>Masculino</option>
                                        </select>
                                    </div>

                                    <div className='col-md-4 mt-3'>
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
                                </div>


                                <div className='row'>

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
                                            <span
                                                className="span_erro text-danger mt-1"> {errors.tipo_logradouro} </span>
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
                                </div>

                                <div className='row'>
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
                                        <MaskedInput
                                            mask = {[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                            type="text"
                                            value={values.cep}
                                            name="cep"
                                            id="cep"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                        {errors.cep && touched.cep && errors.cep &&
                                            <span className="span_erro text-danger mt-1"> {errors.cep} </span>
                                        }
                                    </div>
                                    <div className='col-md-3 mt-3'>
                                        <label htmlFor="telefone" className="form-label">Telefone</label>
                                        <MaskedInput
                                            mask = {['(', /\d/, /\d/, ')', /\d/, /\d/,/\d/, /\d/,/\d/, /\d/,/\d/, /\d/,/\d/]}
                                            type="text"
                                            value={values.telefone}
                                            name="telefone"
                                            id="telefone"
                                            className="form-control"
                                            onChange={handleChange}
                                        />
                                        {errors.telefone && touched.telefone && errors.telefone &&
                                            <span className="span_erro text-danger mt-1"> {errors.telefone} </span>
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
                                        <Link to="/funcionarios" state={{origem: 'edicao'}}>
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
                                        titulo={uuid ? "Funcionário editado com sucesso" : "Funcionário criado com sucesso"}
                                        texto={uuid ? "O Funcionário foi editado com sucesso." : "O Funcionário foi criado com sucesso."}
                                        primeiroBotaoTexto="Fechar"
                                        primeiroBotaoCss="success"
                                    />
                                </section>
                            </form>
                        )}
                    </Formik>
                </div>
            }
        </PaginasContainer>
    )

}