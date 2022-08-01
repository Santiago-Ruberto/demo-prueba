import GoogleLogin from "react-google-login";
import { postUser } from "./Login.actions";
import { AlertMsg, Text, Title } from './styles'

const Login = ({ onSuccess, onFailure }) => {

  const handleOnSuccess = async (response) => {
    localStorage.setItem('googleObj', JSON.stringify(response.profileObj))
    localStorage.setItem('googleId', response.googleId)
    localStorage.setItem('googleAccessToken', response.accessToken)

    await postUser(response.googleId, response.profileObj.email)
    onSuccess()
  }

  const handleOnFailure = (response) => {
    onFailure()
  }
  {/*<GoogleLogin
      clientId="154106837068-2d88tc8fnv4dgrqt80fedqn0t1ur41ga.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={handleOnSuccess}
      onFailure={handleOnFailure}
      cookiePolicy={'single_host_origin'}
  />*/}
  return (

    <>
      <Title>
        Estamos trabajando para mejorar la experiencia de nuestros usuarios
      </Title>
      <br />
      <Text>
        Por eso momentaneamente estara desactivado el uso de las cuentas
        <br />
        <br />
        Gracias por la comprension y gracias a los primeros 200 usuarios registrados {`;)`}
      </Text>

    </>
  )
}

export default Login