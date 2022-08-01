import axios from "axios";
import { API_ENDPOINT } from "../../utils/configuration";

export const fetchCategories = async()=>{
  let data;
  try {
    data = await axios.get(`${API_ENDPOINT}/products/categories`, 
    {
      headers:{
        'x-api-key':"apikey"
      }
    });

  } catch (error) {
    console.log(error.message);
  }
  return data;
}