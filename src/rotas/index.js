import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {authService} from "../services/auth.service";
import {Login} from "../components/login";
import {CriarUsuario} from "../components/criarUsuario";
import {Home} from "../components/home";
import {SemPermissao} from "../components/semPermissao";
import {Pagina404} from "../components/404";
import {CadastroDePacientes} from "../components/pacientes/Cadastro";
import {EdicaoDePacientes} from "../components/pacientes/Edicao";
import {Pacientes} from "../components/pacientes";


const routesConfig = [
    {
        exact: true,
        path: "/sem-permissao",
        component: SemPermissao,
        permissao: '',
    },
    {
        exact: true,
        path: "/Login",
        component: Login,
        permissao: '',
    },
    {
        exact: true,
        path: "/criar-usuario",
        component: CriarUsuario,
        permissao: '',
    },
    {
        exact: true,
        path: "*",
        component: Pagina404,
        permissao: '',
    },
    {
        exact: true,
        path: "/",
        component: Home,
        permissao: '',
    },
    {
        exact: true,
        path: "/pacientes",
        component: Pacientes,
        permissao: '',
    },
    {
        exact: true,
        path: "/cadastro-de-paciente/",
        component: CadastroDePacientes,
        permissoes: '',
    },
    {
        exact: true,
        path: "/edicao-de-paciente/:uuid",
        component: EdicaoDePacientes,
        permissoes: '',
    },
    {
        exact: true,
        path: "/protected",
        component: Home,
        permissao: 'add_emailaddresst',
    },
]

export const Rotas = () => {

    const RequireAuth = ({children, redirectTo, permissao}) => {
        let tem_permissao = authService.getPermissoes(permissao)
        return tem_permissao ? children : <Navigate to={redirectTo}/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                {routesConfig.map((value, key) =>
                    <Route
                        key={key}
                        path={value.path}
                        element={
                            <RequireAuth permissao={value.permissao} redirectTo="/sem-permissao">
                                {value.component()}
                            </RequireAuth>
                        }
                    />
                )}
            </Routes>
        </BrowserRouter>
    )
}