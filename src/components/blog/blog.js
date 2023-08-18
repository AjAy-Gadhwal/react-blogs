import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './blog.css';
import { BlogMetaService } from "../../services/blog-meta-service";
import { toast } from "react-toastify";

const Blog = (props) => {
  const { blog } = props;
  const date = new Date(blog?.createdAt);
  const formattedDate = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

  const likeUnlike = () => {
    BlogMetaService.likeOrComment({ like: true, blogId: blog?._id }).then((res) => {
      toast.warn(`${blog?.title} is ${res.like ? '' : 'un'}liked`);
    });
  };

  return (
    <Card border="warning" className="blog-card mb-4 mx-auto">
      <Card.Img variant="top" src="https://www.gstatic.com/webp/gallery/1.jpg" />

      <Card.Body>
        <Card.Title>{blog?.title}</Card.Title>
        <Card.Text>{blog?.description}</Card.Text>
      </Card.Body>

      <Card.Footer>
        <Row>
          <Col>
            <small className="text-muted">{formattedDate} posted</small>
          </Col>

          <Col className="d-flex justify-content-end align-items-center gap-3">
            <Button size="sm" variant="danger" onClick={likeUnlike} >Like</Button>
            <Button size="sm" variant="primary">Comment</Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default Blog;