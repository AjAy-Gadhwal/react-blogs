import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './blog.css';
import { toast } from "react-toastify";
import { HandThumbsUp, HandThumbsUpFill } from "react-bootstrap-icons";
import { BlogService } from "../../services/blog-service";
import { UserService } from "../../services/user-service";
import { useState } from "react";

const borderType = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
];

const Blog = (props) => {
  const { blog } = props;
  const [blogObj, setBlogObj] = useState(blog);

  const date = new Date(blogObj?.createdAt);
  const formattedDate = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  const borderTypeIndex = Math.floor(Math.random()*borderType.length);
  const isLiked = blogObj?.likes?.includes(UserService.userId());

  const likOrUnlike = () => {
    if (isLiked) {
      BlogService.unlike(blogObj?._id).then((res) => {
        if (res) {
          toast.warn(`You unlike ${blogObj?.title} blog.`);
          setBlogObj(res);
        }
      });
    } else {
      BlogService.like(blogObj?._id).then((res) => {
        if (res) {
          toast.warn(`You like ${blogObj?.title} blog.`);
          setBlogObj(res);
        }
      });
    }    
  };

  return (
    <Card border={borderType[borderTypeIndex]} className="blog-card mb-4 mx-auto">
      <Card.Img variant="top" src="https://www.gstatic.com/webp/gallery/1.jpg" />

      <Card.Body>
        <Card.Title>{blogObj?.title}</Card.Title>
        <Card.Text>{blogObj?.description}</Card.Text>
      </Card.Body>

      <Card.Footer>
        <Row>
          <Col>
            <small className="text-muted">{formattedDate} posted</small>
          </Col>

          <Col className="d-flex justify-content-end align-items-center gap-3">
            <Button 
              variant={isLiked ? 'danger' : 'outline-danger'} className="px-2 py-1 d-flex justify-content-center align-items-center gap-1" 
              onClick={likOrUnlike}
            >
              { 
                isLiked ? (
                  <>Liked <HandThumbsUpFill size={20} /></>
                ) : (
                  <>Like <HandThumbsUp size={20} /></>
                ) 
              } 
            </Button>
          </Col>
        </Row>

        <div>
          Comments
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Blog;