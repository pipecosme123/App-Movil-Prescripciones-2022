import { Conexion } from "../../config";
import { setLoading, startLoading } from "../reducer/systemSlice";

export const login = ({ username = '' }) => {
  return (dispatch, getState) => {

    dispatch(setLoading(true));

    Conexion({
      method: GET,
      url: "/login",
      auth: {
        username,
      },
    })
      .then((res) => {
        const { token, data } = res.data;
        dispatch(setUser({
          data,
          token
        }))
      })
      .catch((err) => {
        reject(err.response.data);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }
}