import FacebookLogin from 'react-facebook-login';
import fbLogin from "../../services/fbLogin";

export const Login = () => {

    const fbResponse = async (response) => {
        let fbResponseService  = await fbLogin(response.accessToken)
        console.log("fbResponse response", response);
        console.log("fbResponse fbResponse", fbResponseService);
    }

    return (
        <div className="App">

            <h1>LOGIN WITH FACEBOOK</h1>

            <FacebookLogin
                textButton="LOGIN WITH FACEBOOK"
                appId= "747336750353989"
                fields="name,email,picture"
                callback={fbResponse}
            />

        </div>
    );
}
