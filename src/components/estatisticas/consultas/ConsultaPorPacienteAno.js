import React from "react";
import DatePicker from "react-datepicker";

export const ConsultaPorPacienteAno = ({mesAno, setMesAno, pacientes, paciente, setPaciente, gerarEstatitisticasPorAnoPaciente}) => {
    return(
        <div className="col">
            <div className="card text-bg-light">
                <div className="card-header">Consultas por paciente por ano</div>
                <div className="card-body">
                    <div className="card-text">
                        <div className='row'>
                            <div className='col-md-8 pe-0'>
                                <select
                                    value={paciente}
                                    onChange={(e) => {
                                        setPaciente(e.target.value)
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
                            </div>
                            <div className='col-md-4 pe-0 pe-md-2 mt-1 mt-md-0'>
                                <DatePicker
                                    selected={mesAno}
                                    onChange={(date) => setMesAno(date)}
                                    locale="pt"
                                    className='form-control'
                                    maxDate={new Date()}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    yearItemNumber={9}
                                />
                            </div>
                            <div className='col-12 text-end mt-2'>
                                <button
                                    onClick={gerarEstatitisticasPorAnoPaciente}
                                    type="button"
                                    className="btn btn-success"
                                    disabled={!paciente || !mesAno}
                                >
                                    Gerar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}