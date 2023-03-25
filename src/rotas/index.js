import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import {Lista} from "../components/pacientes/Lista";
import {Login} from "../components/login";

export const Rotas = () => {
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/lista" element={<Lista />} />
                </Routes>
            </BrowserRouter>
        )

}