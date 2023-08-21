import { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserService } from "../../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      toast.error("Please enter valid data.");
    } else {
      UserService.login(formData).then((res) => {
        if (res?.accessToken) {
          localStorage.setItem('accessToken', res?.accessToken);
          localStorage.setItem('role', res.role);
          localStorage.setItem('user', JSON.stringify(res));
          authContext.checkAuth();

          toast.success("Woohoo, user successfully login!");
          navigate("/");
        } else {
          toast.error("Hoo, something wrong!");
        }
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form d-flex flex-column m-auto pt-5" >
      <h3 className="text-center text-warning pb-4" >Login</h3>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={handleFormDataChange} required />
      </Form.Group>

      <Button type="submit" variant="outline-warning mt-2 align-self-end">Login</Button>
    </Form>
  );
};

export default Login;