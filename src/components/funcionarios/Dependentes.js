import React from "react";
import {FieldArray} from "formik";
import {DatePickerField} from "../datePickerField";

export const Dependentes = ({values, handleChange, setFieldValue, errors, touched}) => {

    return (
        <div className='row'>
            <div className='col-12 mt-3'>
                <h5 className='border-bottom pb-2'><strong>Dependentes do funcionário</strong></h5>
            </div>
            <FieldArray name="dependentes_do_funcionario">
                {({insert, remove, push}) => (
                    <div>
                        {values && values.dependentes_do_funcionario && values.dependentes_do_funcionario.length > 0 &&
                            values.dependentes_do_funcionario.map((dependente, index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-4 mt-2">
                                        <label htmlFor={`dependentes_do_funcionario.${index}.nome`} className="form-label">Nome</label>
                                        <input
                                            value={dependente.nome}
                                            onChange={handleChange}
                                            name={`dependentes_do_funcionario.${index}.nome`}
                                            className='form-control'
                                            placeholder="Insira o nome"
                                            type="text"
                                        />
                                        {errors.dependentes_do_funcionario &&
                                            <span className="span_erro text-danger mt-1">Nome do dependente é obrigatório</span>
                                        }
                                    </div>
                                    <div className="col-md-3 mt-2">
                                        <label htmlFor={`dependentes_do_funcionario.${index}.data_de_nascimento`}  className="form-label">Data de nascimento</label>
                                        <DatePickerField
                                            name={`dependentes_do_funcionario.${index}.data_de_nascimento`}
                                            id={`dependentes_do_funcionario.${index}.data_de_nascimento`}
                                            value={dependente.data_de_nascimento}
                                            onChange={setFieldValue}
                                            maxDate={new Date()}
                                            placeholderText='Digite a data de nascimento'
                                        />
                                    </div>
                                    <div className="col-md-3 mt-2">
                                        <label
                                            htmlFor={`dependentes_do_funcionario.${index}.sexo`}
                                            className="form-label">Sexo</label>
                                        <select
                                            value={dependente.sexo}
                                            onChange={handleChange}
                                            name={`dependentes_do_funcionario.${index}.sexo`}
                                            id={`dependentes_do_funcionario.${index}.sexo`}
                                            className="form-select"
                                        >
                                            <option value=''>Selecione o sexo</option>
                                            <option value='FEMININO'>Feminino</option>
                                            <option value='MASCULINO'>Masculino</option>
                                        </select>
                                    </div>
                                    <div className="col-md-2 mt-2">
                                        <p className='mb-0'>
                                            <label htmlFor={`botao.${index}`} className="form-label">Remover</label>
                                        </p>
                                        <button
                                            onClick={() => remove(index)}
                                            className="btn btn-danger fonte-16"
                                            type="button"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))}
                        <div className='mt-2'>
                            <button
                                type="button"
                                className="btn btn-success mb-2"
                                onClick={() => push({nome: '', data_de_nascimento: '', sexo: ''})}
                            >
                                Adicionar dependente
                            </button>
                        </div>
                    </div>
                )}
            </FieldArray>
        </div>
    )

}