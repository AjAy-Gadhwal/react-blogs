import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BlogService } from "../../services/blog-service";
import Blog from '../../components/blog/blog';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const getAll = useCallback(() => {
    BlogService.getAll().then((res) => {
      console.log('Res : ', res?.length);
      if (res?.length > 0) {
        setBlogs(() => res);
      }
    });
  }, [])

  useEffect(() => {
    getAll();
    setRole(localStorage.getItem('role'));
  }, [getAll]);

  const removeBlog = (id) => {
    BlogService.remove(id).then((res) => {
      toast.warn("Blog removed");
      getAll();
    });
  };

  return (
    <>
      {
        role !== 'admin' ? (
          blogs.map((blog) => <Blog blog={blog} key={blog?._id} />)
        ) : (
          <>
            <Button variant="warning" size="sm" className="mb-3 d-flex ms-auto" onClick={() => navigate('/create')}>Add Blog</Button>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>description</th>
                  <th>media</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  blogs.map((blog, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{blog?.title}</td>
                      <td>{blog?.description}</td>
                      <td>{blog?.media}</td>
                      <td>
                        {
                          new Date(blog?.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                        }
                      </td>
                      <td className="d-flex justify-content-end align-items-center gap-2" >
                        <Button variant="success" size="sm" onClick={() => navigate(`/edit/${blog?._id}`)}>Edit</Button>
                        <Button variant="danger" size="sm" onClick={() => removeBlog(blog?._id)} >Delete</Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </>
        )
      }
    </>
  );
};

export default Blogs;