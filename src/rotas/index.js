import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import {Lista} from "../components/pacientes/Lista";

export const Rotas = () => {
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Lista />} />
                </Routes>
            </BrowserRouter>
        )

}