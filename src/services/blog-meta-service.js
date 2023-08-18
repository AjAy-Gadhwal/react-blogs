import MyAxios from "../config/myAxios";

const likeOrComment = async (body) => {
  const res = await MyAxios.post('/blogMeta', body);
  return res?.data ? res?.data : {};
};

export const BlogMetaService = { likeOrComment };