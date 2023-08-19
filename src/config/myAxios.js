import axios from "axios";

const MyAxios = axios.create({
  baseURL: 'https://node-blogs-1e7dyt5st-ajay-gadhwal.vercel.app/api/v1',
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

