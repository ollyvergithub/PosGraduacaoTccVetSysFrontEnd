import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import {Lista} from "../components/pacientes/Lista";
import {Login} from "../components/login";
import {CriarUsuario} from "../components/criarUsuario";
import {Home} from "../components/home";

export const Rotas = () => {
    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/criar-usuario" element={<CriarUsuario />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/lista" element={<Lista />} />
                </Routes>
            </BrowserRouter>
        )

}