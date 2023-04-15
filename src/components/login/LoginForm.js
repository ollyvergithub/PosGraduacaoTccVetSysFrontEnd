import {useState} from "react";
import formLogin from "../../services/login/formLogin";
import {ModalErro} from "../modalBootstrap/ModalErro";
import Loading from "../loading";
import {useNavigate, Link} from "react-router-dom";

export const LoginForm = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async e => {
        setLoading(true)
        e.preventDefault();
        let data = await formLogin(username, password)
        console.log("submit", data)
        if (data && data.status === 200) {
            setShowExibeModalErro(false)
            window.location.assign('/')
            // navigate("/")
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
                    />
                ) :
                <div className='mb-5'>
                    <p><strong>Faça login com usuário e senha</strong></p>
                    <form className="Auth-form" onSubmit={submit}>
                        <div className="Auth-form-content">
                            <div className="form-group mt-3">
                                <label>Usuário</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Entre com o usuário"
                                    name='username'
                                    type='text'
                                    value={username}
                                    required
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Senha</label>
                                <input
                                    name='password'
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Entre com a senha"
                                    value={password}
                                    required
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-success">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>

                    <p className='mt-3'>
                        <strong><Link to='/criar-usuario'> Ou crie seu usuário </Link> </strong></p>

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