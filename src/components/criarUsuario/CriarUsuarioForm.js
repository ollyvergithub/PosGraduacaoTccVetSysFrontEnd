import React, {useState} from "react";
import formCriarUsuario from "../../services/criarUsuario/formCriarUsuario";

export const CriarUsuarioForm = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const submit = async e => {
        e.preventDefault();
        await formCriarUsuario(username, password1, password2, email)
    }

    return(
        <>
            <h1>LOGIN COM USUÁRIO E SENHA</h1>
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Criar usuário</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Username"
                            name='username'
                            type='text'
                            value={username}
                            required
                            onChange={e => setUsername(e.target.value)}
                        />
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
                            type="text"
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
                            type="text"
                            className="form-control mt-1"
                            placeholder="Repita a senha"
                            value={password2}
                            required
                            onChange={e => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}