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
        component: <SemPermissao/>,
        permissao: '',
    },
    {
        exact: true,
        path: "/login",
        component: <Login/>,
        permissao: '',
    },
    {
        exact: true,
        path: "/",
        component: <Home/>,
        permissao: '',
    },
    {
        exact: true,
        path: "/criar-usuario",
        component: <CriarUsuario/>,
        permissao: '',
    },
    {
        exact: true,
        path: "*",
        component: <Pagina404/>,
        permissao: '',
    },
    {
        exact: true,
        path: "/pacientes",
        component: <Pacientes/>,
        permissao: '',
    },
    {
        exact: true,
        path: "/cadastro-de-paciente/",
        component: <CadastroDePacientes/>,
        permissoes: '',
    },
    {
        exact: true,
        path: "/edicao-de-paciente/:uuid",
        component: <EdicaoDePacientes/>,
        permissoes: '',
    },
    {
        exact: true,
        path: "/protected",
        component: <Home/>,
        permissao: 'add_emailaddresst',
    },
]

export const Rotas = () => {

    const PrivateRoute = ({children, redirectTo, permissao}) => {
        let tem_permissao = authService.getPermissoes(permissao)
        return tem_permissao ? children : <Navigate to={redirectTo}/>;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/protected"
                    element={
                        <PrivateRoute permissao='add_emailaddresst'  redirectTo="/sem-permissao">
                            <SemPermissao />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/pacientes/:uuid?"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <Pacientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-de-paciente"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <CadastroDePacientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edicao-de-paciente/:uuid"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <CadastroDePacientes />
                        </PrivateRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/criar-usuario" element={<CriarUsuario />} />
                <Route path="/sem-permissao" element={<SemPermissao />} />
                <Route path="*" element={<Pagina404 />} />
            </Routes>
        </BrowserRouter>
    )
}