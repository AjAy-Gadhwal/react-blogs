import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import { BlogService } from "../services/blog-service";
import Blog from '../components/blog/blog';
import { Button, Table } from 'react-bootstrap';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const role = localStorage.getItem('role');

  useEffect(() => {
    BlogService.getAll().then((res) => {
      console.log('Res : ', res?.length);
      if (res?.length > 0) {
        setBlogs(() => res);
      }
    });
  }, []);

  return (
    <>
      {
        !accessToken ? <Navigate to="/login" /> : (
          role !== 'admin' ? (
            blogs.map((blog) => <Blog blog={blog} key={blog?._id} />)
          ) : (
            <>
              <Link to="/create">
                <Button variant="warning" size="sm" className="mb-3 d-flex ms-auto">Add Blog</Button>
              </Link>
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
                          <Button variant="success" size="sm">Edit</Button>
                          <Button variant="danger" size="sm">Delete</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
        )
      }
    </>
  );
};

export default Blogs;