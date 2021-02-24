import Axios from "axios";

export const API_URL = "https://corona.lmao.ninja";
export const axios = Axios.create({
  baseURL: API_URL,
});
