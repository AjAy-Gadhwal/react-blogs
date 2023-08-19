import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './blog.css';
import { toast } from "react-toastify";
import { ChatDots, HandThumbsUp, HandThumbsUpFill, Send } from "react-bootstrap-icons";
import { BlogService } from "../../services/blog-service";
import { UserService } from "../../services/user-service";
import { useState } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { WhatsappShareButton } from "react-share";

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
  const [isShowComments, setIsShowComments] = useState(false);
  const [comment, setComment] = useState('');

  const date = new Date(blogObj?.createdAt);
  const formattedDate = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });
  const borderTypeIndex = Math.floor(Math.random()*borderType.length);
  const isLiked = blogObj?.likes?.includes(UserService.userId());

  const likOrUnlike = () => {
    if (isLiked) {
      BlogService.unlike(blogObj?._id).then((res) => {
        if (res) {
          toast.success(`You unlike ${blogObj?.title} blog.`);
          setBlogObj(res);
        }
      });
    } else {
      BlogService.like(blogObj?._id).then((res) => {
        if (res) {
          toast.success(`You like ${blogObj?.title} blog.`);
          setBlogObj(res);
        }
      });
    }    
  };

  const sendComment = () => {
    if (comment) {
      setComment('');

      BlogService.comment(blogObj?._id, comment).then((res) => {
        if (res) {
          toast.success(`You added comment in ${blogObj?.title} blog.`);
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
              { isLiked ? <HandThumbsUpFill size={20} /> : <HandThumbsUp size={20} /> } Like 
            </Button>

            <Button 
              variant='primary' className="px-2 py-1 d-flex justify-content-center align-items-center gap-1" 
              onClick={() => setIsShowComments(!isShowComments)}
            >
              <ChatDots size={20} /> Comment
            </Button>

            <WhatsappShareButton />
          </Col>
        </Row>

        {
          isShowComments && (
            <>
              <InputGroup className="mt-3" >
                <Form.Control type="text" placeholder="Please add comment here" value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button variant='outline-secondary' disabled={!comment} onClick={sendComment} ><Send size={20} /></Button>
              </InputGroup>        
      
              {
                blogObj?.comments?.length > 0 && (
                  <div className="pt-3" >
                    Comments
      
                    <ListGroup>
                      {
                        blogObj?.comments.map((com) => (
                          <ListGroup.Item key={com?._id}>
                            <div className="fw-bold">{com?.userId?.username}</div>
                            {com?.comment}
                          </ListGroup.Item>
                        ))
                      }
                    </ListGroup>
                  </div>
                )
              }                    
            </>
          )
        }
      </Card.Footer>
    </Card>
  );
};

export default Blog;