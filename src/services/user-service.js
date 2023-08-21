import MyAxios from "../config/myAxios";

const register = async (body) => {
  body['email'] = body?.email?.toLowerCase();
  const res = await MyAxios.post('/users/register', body);
  return res?.data ? res?.data : {};
};

const login = async (body) => {
  const res = await MyAxios.post('/users/login', body);
  return res?.data ? res?.data : {};
};

const loginUser = () => {  
  return JSON.parse(localStorage.getItem('user') || '{}');
};

const userId = () => {  
  return loginUser()?._id;
};

export const UserService = { register, login, loginUser, userId };