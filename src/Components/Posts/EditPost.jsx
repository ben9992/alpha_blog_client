import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { axios } from "../Auth/Axios";
import { PencilFill } from "react-bootstrap-icons";

function EditPost(props) {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState({
    content: props.postData,
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
    axios.put(`/posts/${props.postId}`, {text: postData.content}).then(()=> {
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
          <Modal.Title>ערוך פוסט</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formPostContent">
              <Form.Control
                style={{ resize: "none" }}
                as="textarea"
                rows={7}
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
    </>
  );
}

export default EditPost;