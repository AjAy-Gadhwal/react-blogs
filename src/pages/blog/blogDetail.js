import { useEffect, useState } from "react";
import Blog from "../../components/blog/blog";
import { useParams } from "react-router-dom";
import { BlogService } from "../../services/blog-service";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      BlogService.get(id).then((res) => {
        if (res) {
          setBlog(res);
        }
      });
    }
  }, [id]);

  return blog?._id ? <Blog blog={blog}/> : <></>;
};

export default BlogDetail;