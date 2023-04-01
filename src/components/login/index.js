import {LoginForm} from "./LoginForm";
import {LoginFacebook} from "./LoginFacebook";
import {LoginContainer} from "./LoginContainer";

export const Login = () => {
    return (
        <LoginContainer>
            <LoginFacebook/>
            <LoginForm/>
        </LoginContainer>
    );
}
