import React from "react";
import {LoginFacebook} from "../login/LoginFacebook";
import {CriarUsuarioForm} from "./CriarUsuarioForm";

export const CriarUsuario = () =>{
    return(
        <div className='container'>
            <LoginFacebook/>
            <CriarUsuarioForm/>
        </div>
    )
}