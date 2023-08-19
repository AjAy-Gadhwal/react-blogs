import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [accessToken, setAccessToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  const logout = () => {
    localStorage.clear();
    setTimeout(() => {
      toast.warn("User successfully logout!");
      navigate('/login');
    }, 0);
  }


  return (
    <Navbar sticky="top" expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-warning text-bold">Blogs</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-warning" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="gap-3">
            <Link to="/" className="text-decoration-none text-warning">Blogs</Link>
            {
              accessToken ? (
                <Link onClick={logout} className="text-decoration-none text-warning">Logout</Link>
              ) : (
                <>
                  <Link to="/register" className="text-decoration-none text-warning">Sign Up</Link>
                  <Link to="/login" className="text-decoration-none text-warning">Login</Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;