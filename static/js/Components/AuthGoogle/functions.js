import axios from "axios";

export const stillValidToken = async () => {
  let stillValid
  let googleAccessToken = localStorage.getItem('googleAccessToken')
  if (!googleAccessToken) {
    stillValid = false
  } else {
    try {
      await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${googleAccessToken}`);
      stillValid = true
    } catch (error) {
      console.log(error)
      stillValid = false
      localStorage.setItem('googleObj', null)
      localStorage.setItem('googleAccessToken', null)
    }
  }
  return stillValid
}