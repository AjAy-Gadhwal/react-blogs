import { useEffect, useRef, useState } from "react";
import Blog from "../../components/blog/blog";
import { useParams } from "react-router-dom";
import { BlogService } from "../../services/blog-service";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

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