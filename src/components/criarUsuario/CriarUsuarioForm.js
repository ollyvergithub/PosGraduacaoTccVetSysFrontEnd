import React, {useState} from "react";
import formCriarUsuario from "../../services/criarUsuario/formCriarUsuario";
import Loading from "../loading";
import {ModalErro} from "../modalBootstrap/ModalErro";
import {Link, useNavigate} from "react-router-dom";

export const CriarUsuarioForm = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showExibeModalErro, setShowExibeModalErro] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async e => {
        setLoading(true)
        e.preventDefault();
        let data = await formCriarUsuario(username, password1, password2, email)
        console.log("submit", data)
        if (data && data.status === 204) {
            setShowExibeModalErro(false)
            navigate("/login")
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
                <form className="Auth-form" onSubmit={submit}>
                    <div className="Auth-form-content">
                        <p><strong>Criar usuário</strong></p>
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
                            <p className='fonte-12'>Informe um nome de usuário válido. Este valor pode conter apenas letras, números e os seguintes caracteres @ . + - _ </p>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Email"
                                name='email'
                                type='text'
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Senha</label>
                            <input
                                name='password'
                                type="password"
                                className="form-control mt-1"
                                placeholder="Senha"
                                value={password1}
                                required
                                onChange={e => setPassword1(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Repita a senha</label>
                            <input
                                name='password2'
                                type="password"
                                className="form-control mt-1"
                                placeholder="Repita a senha"
                                value={password2}
                                required
                                onChange={e => setPassword2(e.target.value)}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-success">
                                Criar usuário
                            </button>
                        </div>
                        <p className='mt-3'>
                            <strong><Link to='/login'>Ou faça seu login</Link> </strong>
                        </p>
                    </div>

                    <section>
                        <ModalErro
                            show={showExibeModalErro}
                            handleClose={() => setShowExibeModalErro(false)}
                            titulo="Erro ao criar usuário"
                            texto={`<p>Não foi possível criar um novo usuário com as credenciais fornecidas. <br/> Tente novamente com outro usuário e/ou outro e-mail</p>`}
                            primeiroBotaoTexto="Fechar"
                            primeiroBotaoCss="success"
                        />
                    </section>
                </form>
            }
        </>
    )
}