import axios from "axios";

const MyAxios = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
  headers: {
    Authorization: localStorage.getItem('accessToken')
  }
});

MyAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (![200, 201, 500].includes(err?.response?.status)) {
      localStorage.clear();
      window.location.href = '/login';
    }

    return Promise.reject(err?.response);
  }
);

export default MyAxios;
