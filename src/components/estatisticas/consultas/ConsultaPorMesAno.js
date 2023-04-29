import React from "react";
import DatePicker from "react-datepicker";
import {getGerarEstatisticasPorMesAno} from "../../../services/consultas/Consultas.service";

export const ConsultaPorMesAno = ({mesAno, setMesAno, gerarEstatitisticasPorMesAno}) => {
    return(
        <div className="col">
            <div className="card text-bg-light">
                <div className="card-header">Consultas por mês e ano</div>
                <div className="card-body">
                    <div className="card-text">
                        <div>
                            <DatePicker
                                selected={mesAno}
                                onChange={(date) => setMesAno(date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                showFullMonthYearPicker
                                locale="pt"
                                className='form-control'
                                maxDate={new Date()}
                            />
                        </div>
                        <div className='text-end mt-2'>
                            <button
                                onClick={gerarEstatitisticasPorMesAno}
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