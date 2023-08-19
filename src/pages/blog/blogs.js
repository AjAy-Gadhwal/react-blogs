import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BlogService } from "../../services/blog-service";
import Blog from '../../components/blog/blog';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { PencilFill, Plus, Trash2Fill } from 'react-bootstrap-icons';
import { Config } from '../../constants/config';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const getAll = useCallback(() => {
    BlogService.getAll().then((res) => {
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
      toast.success("Blog removed");
      getAll();
    });
  };

  return (
    <>
      {
        role !== 'admin' ? (
          blogs.map((blog) => (
            <div key={blog?._id} onClick={() => navigate(`/blog/${blog?._id}`)} >
              <Blog blog={blog}/>
            </div>
          ))
        ) : (
          <>
            <Button variant="warning" size="sm" className="mb-3 d-flex align-items-center ms-auto" onClick={() => navigate('/create')}>
              <Plus size={20} /> Blog
            </Button>
            
            <Table className="border" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ width: '200px' }}>title</th>
                  <th>description</th>
                  <th style={{ width: '150px' }}>media</th>
                  <th>likes</th>
                  <th>comments</th>
                  <th style={{ width: '100px' }}>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  blogs.map((blog, i) => (
                    <tr key={blog?._id}>
                      <td>{i + 1}</td>
                      <td>{blog?.title}</td>
                      <td>{blog?.description}</td>
                      <td>
                        <div className="embed-responsive embed-responsive-1by1">
                          {
                            (blog?.media?.includes('jpg') || blog?.media?.includes('jpeg') || blog?.media?.includes('png') || blog?.media?.includes('gif')) ? (
                              <img src={`${Config.SERVER_URL}${blog?.media}`} width="150" alt={blog?.title} />
                            ) : (
                              <iframe className="embed-responsive-item" src={`${Config.SERVER_URL}${blog?.media}`} width="150" title={blog?.title} />
                            )
                          }
                        </div>
                      </td>
                      <td>{blog?.likes?.length || 0}</td>
                      <td>{blog?.comments?.length || 0}</td>
                      <td>
                        {
                          new Date(blog?.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                        }
                      </td>
                      <td>
                        <div className="d-flex gap-2" >
                          <Button 
                            variant="outline-success" className="p-1 d-flex justify-content-center align-items-center" style={{ width: '32px', height: '32px' }} 
                            onClick={() => navigate(`/edit/${blog?._id}`)}
                          >
                            <PencilFill />
                          </Button>

                          <Button 
                            variant="outline-danger" className="p-1 d-flex justify-content-center align-items-center" style={{ width: '32px', height: '32px' }} 
                            onClick={() => removeBlog(blog?._id)}
                          >
                            <Trash2Fill />
                          </Button>
                        </div>
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