import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {authService} from "../services/auth.service";
import {Login} from "../components/login";
import {CriarUsuario} from "../components/criarUsuario";
import {Home} from "../components/home";
import {SemPermissao} from "../components/semPermissao";
import {Pagina404} from "../components/404";
import {CadastroDePacientes} from "../components/pacientes/Cadastro";
import {Pacientes} from "../components/pacientes";
import {EstatisticasPacientes} from "../components/estatisticas/pacientes";
import {Clientes} from "../components/clientes";
import {CadastroDeClientes} from "../components/clientes/Cadastro";
import {EstatisticasClientes} from "../components/estatisticas/clientes";
import {Funcionarios} from "../components/funcionarios";
import {CadastroDeFuncionarios} from "../components/funcionarios/Cadastro";
import {EdicaoDeFuncionarios} from "../components/funcionarios/Edicao";
import {EdicaoDeClientes} from "../components/clientes/Edicao";
import {Veterinarios} from "../components/veterinarios";
import {CadastroDeVeterinarios} from "../components/veterinarios/Cadastro";
import {Consultas} from "../components/consultas";
import {CadastroDeConsultas} from "../components/consultas/Cadastro";
import {EdicaoDeConsultas} from "../components/consultas/Edicao";


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
                <Route
                    path="/gerar-estatisticas-pacientes"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <EstatisticasPacientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/clientes/:uuid?"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <Clientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-de-cliente"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <CadastroDeClientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edicao-de-cliente/:uuid"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <EdicaoDeClientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/gerar-estatisticas-clientes"
                    element={
                        <PrivateRoute permissao=''  redirectTo="/sem-permissao">
                            <EstatisticasClientes />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/funcionarios"
                    element={
                        <PrivateRoute permissao='acessar_funcionarios_administrativos'  redirectTo="/sem-permissao">
                            <Funcionarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-de-funcionario"
                    element={
                        <PrivateRoute permissao='acessar_funcionarios_administrativos'  redirectTo="/sem-permissao">
                            <CadastroDeFuncionarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edicao-de-funcionario/:uuid"
                    element={
                        <PrivateRoute permissao='acessar_funcionarios_administrativos'  redirectTo="/sem-permissao">
                            <EdicaoDeFuncionarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/veterinarios"
                    element={
                        <PrivateRoute permissao='acessar_veterinarios'  redirectTo="/sem-permissao">
                            <Veterinarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-de-veterinario"
                    element={
                        <PrivateRoute permissao='acessar_veterinarios'  redirectTo="/sem-permissao">
                            <CadastroDeVeterinarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edicao-de-veterinario/:uuid"
                    element={
                        <PrivateRoute permissao='acessar_veterinarios'  redirectTo="/sem-permissao">
                            <CadastroDeVeterinarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/consultas"
                    element={
                        <PrivateRoute permissao='acessar_consultas'  redirectTo="/sem-permissao">
                            <Consultas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cadastro-de-consulta"
                    element={
                        <PrivateRoute permissao='acessar_consultas'  redirectTo="/sem-permissao">
                            <CadastroDeConsultas />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edicao-de-consulta/:uuid"
                    element={
                        <PrivateRoute permissao='acessar_consultas'  redirectTo="/sem-permissao">
                            <EdicaoDeConsultas />
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