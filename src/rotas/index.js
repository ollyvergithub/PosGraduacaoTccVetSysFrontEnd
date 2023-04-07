import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import {Lista} from "../components/pacientes/Lista";
import {Login} from "../components/login";
import {CriarUsuario} from "../components/criarUsuario";
import {Home} from "../components/home";
import {authService} from "../services/auth.service";
import {SemPermissao} from "../components/semPermissao";
import {Pagina404} from "../components/404";

export const Rotas = () => {

    function RequireAuth({ children, redirectTo, permissao}) {
        let tem_permissao = authService.getPermissoes(permissao)
        return tem_permissao ? children : <Navigate to={redirectTo} />;
    }

    return(
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/criar-usuario" element={<CriarUsuario />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/pacientes/" element={<Lista />} />
                    <Route
                        path="/protected"
                        element={
                            <RequireAuth permissao='add_emailaddress' redirectTo="/login">
                                <SemPermissao />
                            </RequireAuth>
                        }
                    />
                    <Route path='*' element={<Pagina404 />} />
                </Routes>
            </BrowserRouter>
        )

}