import FacebookLogin from "react-facebook-login";
import fbLogin from "../../services/login/fbLogin";
import {useState} from "react";
import {ModalErro} from "../modalBootstrap/ModalErro";
import Loading from "../loading";
import {useNavigate} from "react-router-dom";

export const LoginFacebook = () => {
    const navigate = useNavigate();

    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);

    const fbResponse = async (response) => {
        setLoading(true)
        let fbResponseService = await fbLogin(response.accessToken)
        console.log("fbResponse response", response);
        console.log("fbResponse fbResponse", fbResponseService);
        if (fbResponseService && fbResponseService === 200) {
            setShowExibeModalErro(false)
            window.location.assign('/')
            //navigate("/")
        } else {
            setShowExibeModalErro(true)
        }
        setLoading(false)
    }

    return (
        <>
            {loading ? (
                    <Loading
                        corGrafico="black"
                        corFonte="dark"
                        marginTop="0"
                        marginBottom="0"
                        texto="Aguarde o login..."
                    />
                ) :
                <div className='text-center pt-3 pb-5'>
                    <FacebookLogin
                        textButton="LOGIN COM FACEBOOK"
                        appId="747336750353989"
                        fields="name,email,picture"
                        isMobile={false}
                        redirectUri="https://vet-sys-app-ollyver.herokuapp.com/"
                        callback={fbResponse}
                    />

                    <section>
                        <ModalErro
                            show={showExibeModalErro}
                            handleClose={() => setShowExibeModalErro(false)}
                            titulo="Erro ao efetuar login"
                            texto={`<p>Não foi possível realizar o login com as credenciais fornecidas. Tente novamente</p>`}
                            primeiroBotaoTexto="Fechar"
                            primeiroBotaoCss="success"
                        />
                    </section>
                </div>
            }
        </>
    )

}

