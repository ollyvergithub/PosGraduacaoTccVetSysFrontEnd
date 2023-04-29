import React from "react";
import DatePicker from "react-datepicker";

export const ConsultaPorAno = ({mesAno, setMesAno, gerarEstatitisticasPorAno}) => {
    return(
        <div className="col">
            <div className="card text-bg-light">
                <div className="card-header">Consultas por ano</div>
                <div className="card-body">
                    <div className="card-text">
                        <div>
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
                        <div className='text-end mt-2'>
                            <button
                                onClick={gerarEstatitisticasPorAno}
                                type="button"
                                className="btn btn-success"
                                disabled={!mesAno}
                            >
                                Gerar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}