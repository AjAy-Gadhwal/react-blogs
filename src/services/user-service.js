import MyAxios from "../config/myAxios";

const register = async (body) => {
  const res = await MyAxios.post('/users/register', body);
  return res?.data ? res?.data : {};
};

const login = async (body) => {
  const res = await MyAxios.post('/users/login', body);
  return res?.data ? res?.data : {};
};

export const UserService = { register, login };