import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { axios } from "../Auth/Axios";

function NewPost(props) {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState({
    content: "",
  });

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false)
        props.onClose()
    }
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/posts/`, {text: postData.content}).then(()=> {
        handleCloseModal();
    }).catch(() => {
        handleCloseModal();
    })
  };

  return (
    <div className='rtl'>
      <Button variant="primary" onClick={handleShowModal}>
        פוסט חדש
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>צור פוסט חדש</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPostContent">
              <Form.Label>תוכן</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                placeholder="כתוב\כיתבי תגובה לפוסט"
                value={postData.content}
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
  );
}

export default NewPost;