import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BlogService } from "../services/blog-service";

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: '', description: '', media: '' });
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
    } else {
      BlogService.create(formData).then((res) => {
        if (res) {
          toast.warn("Woohoo, blog created successfully!");
          navigate("/");
        } else {
          toast.error("Hoo, something wrong!");
        }
      });
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form d-flex flex-column m-auto pt-5" >
      <h3 className="text-center text-warning pb-4" >Create Blog</h3>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={formData.title} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={formData.description} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Media</Form.Label>
        <Form.Control type="text" name="media" value={formData.media} onChange={handleFormDataChange} required />
      </Form.Group>

      <Button type="submit" variant="outline-warning mt-2 align-self-end">Create</Button>
    </Form>
  );
};

export default CreateBlog;