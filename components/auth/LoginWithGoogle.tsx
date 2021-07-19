import { ReactElement } from "react";
import GoogleLogin from "react-google-login";
import { getAccessToken } from "../../api/auth";

const LoginWithGoogle = (): ReactElement => {
  const handleSuccess = async (res) => {
    const { accessToken, refreshToken } = await getAccessToken("google", res.code);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  const handleFailure = (err): void => {
    console.error(err);
  }

  return (
    <>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
        responseType="code"
        accessType="offline"
        buttonText="Sign in"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
      />
    </>
  )
}

export default LoginWithGoogle;
