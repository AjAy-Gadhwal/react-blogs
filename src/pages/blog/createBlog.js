import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BlogService } from "../../services/blog-service";

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: '', description: '', media: '' });
  const [media, setMedia] = useState(null);
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFormDataChange = (event) => {
    const { name, value, files } = event.target;
    const file = files?.[0];

    if (file) {
      setMedia(file);
    }

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
      console.log('formData : ', formData);
      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      formDataObj.append('media', media);

      if (id) {
        BlogService.update(id, formDataObj).then((res) => {
          if (res) {
            toast.success("Woohoo, blog updated successfully!");
            navigate("/");
          } else {
            toast.error("Hoo, something wrong!");
          }
        });
      } else {
        BlogService.create(formDataObj).then((res) => {
          if (res) {
            toast.success("Woohoo, blog created successfully!");
            navigate("/");
          } else {
            toast.error("Hoo, something wrong!");
          }
        });
      }
    }
  };

  useEffect(() => {
    if (id) {
      BlogService.get(id).then((res) => {
        if (res) {
          setFormData({ title: res?.title, description: res?.description, media: '' });
        }
      });
    }
  }, [id]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form d-flex flex-column m-auto pt-5" >
      <h3 className="text-center text-warning pb-4" >{id ? 'Update' : 'Create'} Blog</h3>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={formData.title} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleFormDataChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Media</Form.Label>
        <Form.Control type="file" name="media" value={formData.media} onChange={handleFormDataChange} required />
      </Form.Group>

      <Button type="submit" variant="outline-warning mt-2 align-self-end">{id ? 'Update' : 'Create'}</Button>
    </Form>
  );
};

export default CreateBlog;