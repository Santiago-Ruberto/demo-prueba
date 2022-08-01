import axios from "axios";
import { API_ENDPOINT } from "../../utils/configuration";
import lzstring from 'lz-string'
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export const fetchProducts = async () => {
  let data;
  try {
    data = await axios.get(`${API_ENDPOINT}/products`,
      {
        headers: {
          'x-api-key': "apikey"
        }
      });
    data.data = JSON.parse(lzstring.decompress(data.data))
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

export const fetchFirstLoadProducts = async () => {
  let data;
  try {
    data = await axios.get(`${API_ENDPOINT}/products/firstLoadProducts`,
      {
        headers: {
          'x-api-key': "apikey"
        }
      });

  } catch (error) {
    console.log(error.message);
  }
  return data;
}

export const postFavorite = async (productId) => {
  let data = null;
  try {
    data = await axios.post(`${API_ENDPOINT}/products/favorite`,
      {
        productId: productId,
        userId: localStorage.getItem('googleId')
      }
    );
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

export const deleteFavorite = async (productId) => {
  let data = null;
  try {
    data = await axios.post(`${API_ENDPOINT}/products/favorite/delete`,
      {
        productId: productId,
        userId: localStorage.getItem('googleId')
      }
    );
  } catch (error) {
    console.log(error.message);
  }
  return data;
}

export const fetchFavorites = async () => {
  let data = null;
  try {
    data = await axios.get(`${API_ENDPOINT}/products/favorites`);
  } catch (error) {
    console.log(error.message);
  }
  return data;
}