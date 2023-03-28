import {LoginForm} from "./LoginForm";
import {LoginFacebook} from "./LoginFacebook";

export const Login = () => {
    return (
        <div className='container'>
            <LoginFacebook/>
            <LoginForm/>
        </div>
    );
}
