import React from "react";
import {LoginFacebook} from "../login/LoginFacebook";
import {CriarUsuarioForm} from "./CriarUsuarioForm";
import {LoginContainer} from "../login/LoginContainer";

export const CriarUsuario = () =>{
    return(
        <LoginContainer>
            <LoginFacebook/>
            <CriarUsuarioForm/>
        </LoginContainer>
    )
}