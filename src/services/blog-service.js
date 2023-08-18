import MyAxios from "../config/myAxios";

const getAll = async () => {
  const res = await MyAxios.get('/blogs');
  return res?.data ? res?.data : [];
};

const create = async (body) => {
  const res = await MyAxios.post('/blogs', body);
  return res?.data ? res?.data : {};
};

const update = async (id, body) => {
  const res = await MyAxios.put(`/blogs/${id}`, body);
  return res?.data ? res?.data : {};
};

const remove = async (id) => {
  const res = await MyAxios.delete(`/blogs/${id}`);
  return res?.data ? res?.data : {};
};

const get = async (id) => {
  const res = await MyAxios.get(`/blogs/${id}`);
  return res?.data ? res?.data : {};
};

export const BlogService = { getAll, create, update, remove, get };