import GoogleLogin from "@leecheuk/react-google-login";
import FacebookLogin from 'react-facebook-login';
import googleLogin from "../../services/googleLogin";
import fbLogin from "../../services/fbLogin";
import { gapi } from "gapi-script";


export const Login = () => {
    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId:
                "869020177822-bkgv8tlknftrn6iqombglbh3quiipnir.apps.googleusercontent.com",
            plugin_name: "chat",
        });
    });

    const responseGoogle = async (response) => {
        let googleResponse  = await googleLogin(response.accessToken)
        console.log("responseGoogle googleResponse",  googleResponse);
        console.log("responseGoogle response", response);
    }

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
                appId= "168270402707941"
                fields="name,email,picture"
                callback={fbResponse}
            />
            <br/>

            <h1>LOGIN WITH GOOGLE</h1>

            <GoogleLogin
                clientId="869020177822-bkgv8tlknftrn6iqombglbh3quiipnir.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />

        </div>
    );
}
