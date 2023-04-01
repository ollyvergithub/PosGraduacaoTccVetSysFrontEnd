import {useState} from "react";
import formLogin from "../../services/login/formLogin";

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async e => {
        e.preventDefault();
        await formLogin(username, password)
    }

    return(
        <div className='text-center'>
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
        </div>

    )
}