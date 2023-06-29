import axios from "axios";
import { baseURL } from "./Constants/constants";

export const Conexion = axios.create({
  baseURL,
});
