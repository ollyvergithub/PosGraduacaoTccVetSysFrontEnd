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
        <div className="Auth-form-container">
            <h1>LOGIN COM USUÁRIO E SENHA</h1>
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Login</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            className="form-control mt-1"
                            placeholder="Enter Username"
                            name='username'
                            type='text'
                            value={username}
                            required
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            name='password'
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}