import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import './blog.css';
import { toast } from "react-toastify";
import { ChatDots, HandThumbsUp, HandThumbsUpFill, Send, Share } from "react-bootstrap-icons";
import { BlogService } from "../../services/blog-service";
import { UserService } from "../../services/user-service";
import { useState } from "react";
import { Form, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { Config } from "../../constants/config";
import { useNavigate } from "react-router-dom";

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
  const [show, setShow] = useState(false);  
  const navigate = useNavigate();
  const location = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port: ''}`;

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card border={borderType[borderTypeIndex]} className="blog-card mb-4 mx-auto">
        <div key={blog?._id} onClick={() => navigate(`/blog/${blog?._id}`)}>
          {
            (blog?.media?.includes('jpg') || blog?.media?.includes('jpeg') || blog?.media?.includes('png') || blog?.media?.includes('gif')) ? (
              <Card.Img variant="top" src={`${Config.SERVER_URL}${blog?.media}`} className="w-100" />
            ) : (
              <iframe className="w-100 rounded-top" src={`${Config.SERVER_URL}${blog?.media}`} title={blog?.title} />
            )
          }
        </div>

        <Card.Body onClick={() => navigate(`/blog/${blog?._id}`)}>
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

              <Button 
                variant='success' className="px-2 py-1 d-flex justify-content-center align-items-center gap-1" 
                onClick={handleShow}
              >
                <Share size={16} /> Share
              </Button>              
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
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex gap-3">
          <FacebookShareButton url={`${location}/blog/${blogObj?._id}`} quote={blog?.title}>
            <FacebookIcon size={32} />
          </FacebookShareButton>  

          <WhatsappShareButton url={`${location}/blog/${blogObj?._id}`} quote={blog?.title}>
            <WhatsappIcon size={32} />
          </WhatsappShareButton>  

          <TwitterShareButton url={`${location}/blog/${blogObj?._id}`} quote={blog?.title}>
            <TwitterIcon size={32} />
          </TwitterShareButton>

          <TelegramShareButton url={`${location}/blog/${blogObj?._id}`} quote={blog?.title}>
            <TelegramIcon size={32} />
          </TelegramShareButton>  
        </Modal.Body>        
      </Modal>
    </>
  );
};

export default Blog;