import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { axios } from "../Auth/Axios";
import { PencilFill } from "react-bootstrap-icons";

function EditComment(props) {
  const [showModal, setShowModal] = useState(false);
  const [commentData, setCommentData] = useState({
    content: props.commentData,
  });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false)
        props.onClose()
    }
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/posts/comments/${props.postId}/${props.commentId}`, {text: commentData.content}).then(()=> {
        handleCloseModal();
    }).catch(() => {
        handleCloseModal();
    })
  };

  return (
    <>
    
    <Button className="btn btn-light" onClick={handleShowModal}><PencilFill/></Button>
    <div className='rtl'>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>ערוך תגובה</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPostContent">
              <Form.Label>תוכן</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                placeholder="כתוב\כיתבי תגובה"
                value={commentData.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ביטול
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            שמור
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default EditComment;