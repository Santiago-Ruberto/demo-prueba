import axios from "axios";
import { API_ENDPOINT } from "../../utils/configuration";

export const getFavorites = async (googleId) => {
  let data = null;
  try {
    data = await axios.get(`${API_ENDPOINT}/products/favorites/${googleId}`,
      {
        headers: {
          'x-api-key': "apikey"
        }
      });
    data = data.data
  } catch (error) {
    console.log(error.message);
  }
  return data;
}