import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserService } from "../../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

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
      UserService.register(formData).then((res) => {
        if (res) {
          toast.warn("Woohoo, user successfully registered!");
          navigate("/login");
        } else {
          toast.error("Hoo, something wrong!");
        }
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form d-flex flex-column m-auto pt-5" >
      <h3 className="text-center text-warning pb-4" >Registration</h3>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" value={formData.username} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formData.email} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={formData.password} onChange={handleFormDataChange} required />
      </Form.Group>

      <Button type="submit" variant="outline-warning mt-2 align-self-end">Register</Button>
    </Form>
  );
};

export default Register;