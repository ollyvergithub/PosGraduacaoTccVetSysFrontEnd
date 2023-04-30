import React from "react";
import LogoMenuSuperior from "../../assets/img/logo-menu-superior.png"
import "./menu-superior.scss"
import {Link, NavLink} from "react-router-dom";
import {authService} from "../../services/auth.service";

export const MenuSuperior = () => {

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className='navbar-brand sem-formatacao' to='/'>
                        <img src={LogoMenuSuperior} alt='Logo menu superior VetSys'/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 text-end">
                            <li className="nav-item">
                                <NavLink className='nav-link cor-itens-menu py-3' to='/pacientes'>Pacientes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link cor-itens-menu py-3' to='/clientes'>Clientes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link cor-itens-menu py-3' to='/funcionarios'>Funcionários</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link cor-itens-menu py-3' to='/veterinarios'>Veterinários</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link cor-itens-menu py-3' to='/consultas'>Consultas</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle cor-itens-menu py-3" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Estatísticas
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className="nav-item">
                                        <Link className='cor-itens-menu dropdown-item' to='/estatisticas-pacientes'>Pacientes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className='cor-itens-menu dropdown-item' to='/estatisticas-clientes'>Clientes</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className='cor-itens-menu dropdown-item' to='/estatisticas-consultas'>Consultas</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to='#' className='nav-link cor-itens-menu btn-sem-formatacao py-3' onClick={authService.logout}>Sair</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )

}