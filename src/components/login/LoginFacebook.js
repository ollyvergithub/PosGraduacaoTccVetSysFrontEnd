import FacebookLogin from "react-facebook-login";
import fbLogin from "../../services/login/fbLogin";

export const LoginFacebook = () => {

    const fbResponse = async (response) => {
        let fbResponseService = await fbLogin(response.accessToken)
        console.log("fbResponse response", response);
        console.log("fbResponse fbResponse", fbResponseService);
    }

    return (
        <div className='text-center pt-3 pb-5'>
            <p><strong>Faça login com Facebook</strong></p>

                <FacebookLogin
                    textButton="LOGIN WITH FACEBOOK"
                    appId="747336750353989"
                    fields="name,email,picture"
                    callback={fbResponse}
                />

        </div>
    )

}

