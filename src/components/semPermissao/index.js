import React from "react";
import {PaginasContainer} from "../paginasContainer";
import Img404 from "../../assets/img/img-404.svg"
import {useNavigate} from "react-router-dom";

export const SemPermissao = () => {

    const navigate = useNavigate();

    const clickToLogin = () => {
        navigate("/login")
    };

    return(
        <PaginasContainer>
            <div className="row justify-content-center container-404">
                <div className="col-md-auto col-lg-7">
                    <p className="texto-404 text-center mt-3">
                        Você não tem permissao para acessar essa página
                        <button
                            onClick={() => clickToLogin()}
                            className="link-404"
                        >
                            Ir para a tela de login
                        </button>
                    </p>
                </div>
                <div className="col-md-auto col-lg-12">
                    <div className="text-center">
                        <img src={Img404} alt="" className="img-fluid"/>
                    </div>
                </div>
            </div>
        </PaginasContainer>
    )

}