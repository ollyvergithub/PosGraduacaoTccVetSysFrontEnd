import React from "react";
import './login.scss'
import LogoSusiVeterinaria from "../../assets/img/logo-vet-sys.png"

export const LoginContainer = ({children}) => {
    return (
        <>
            <div className="login-bg d-none d-lg-block d-xl-block"/>
            <div className="right-half login-ptrf d-lg-flex">
                <div className="container my-auto">
                    <div className="logo-ptrf">
                        <img className="img-fluid img-logo-ptrf" src={LogoSusiVeterinaria} alt=""/>
                    </div>
                    <div className="w-100 my-3 d-flex justify-content-center">
                        <div className="w-100">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};