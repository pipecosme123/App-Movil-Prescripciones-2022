import { baseURL } from "../Constants/constants";

export const urlImages = (key) => {
    return `${baseURL}/img?key=${key}`;
}