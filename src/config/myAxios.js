import axios from "axios";
import { Config } from "../constants/config";
import { toast } from "react-toastify";

const MyAxios = axios.create({
  baseURL: `${Config.SERVER_URL}/api/v1`,
});

MyAxios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  error => Promise.reject(error)
);

MyAxios.interceptors.response.use(
  (res) => {
    console.log('res : ', res);
    return res;
  },
  (err) => {
    console.log('err : ', err);
    toast.error(err?.response?.data?.message);

    if (![200, 201, 500].includes(err?.response?.status)) {
      localStorage.clear();
      window.location.href = '/login';
    }

    return err?.response;
  }
);

export default MyAxios;

