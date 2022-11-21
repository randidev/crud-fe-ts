import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constant/env";

const serviceInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export default serviceInstance;
