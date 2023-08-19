import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Blogs from './pages/blog/blogs';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import { ToastContainer } from 'react-toastify';
import CreateBlog from './pages/blog/createBlog';
import NotFound from './pages/auth/notFound';
import AuthGuard from './guards/authGuard';
import AdminAuthGuard from './guards/adminAuthGuard';
import LoginGuard from './guards/loginGuard';
import BlogDetail from './pages/blog/blogDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: (
          <AuthGuard>
            <Blogs />
          </AuthGuard>
        ),
      },
      {
        path: "blog/:id",
        element: <BlogDetail />,
      },
      {
        path: "create",
        element: (
          <AdminAuthGuard>
            <CreateBlog />
          </AdminAuthGuard>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <AdminAuthGuard>
            <CreateBlog />
          </AdminAuthGuard>
        )
      },
      {
        path: "register",
        element: (
          <LoginGuard>
            <Register />
          </LoginGuard>
        ),
      },
      {
        path: "login",
        element: (
          <LoginGuard>
            <Login />
          </LoginGuard>
        ),
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
