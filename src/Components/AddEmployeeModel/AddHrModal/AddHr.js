import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; 
import { useAPI } from "../../../Context";


export default function Register() {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState({
    name:"",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const { signUpHR } = useAPI();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const UserLogin = () => {
    signUpHR(login);
    handleCloseModal(); 
    window.location.reload()
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal} style={{marginLeft:'0.5rem', marginBottom:"0.5rem"}}>
        Register
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>HR Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                onChange={(e) => handleChange(e)}
                name="name"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                name="password"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter Password"
                onChange={(e) => handleChange(e)}
                name="confirm_password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={UserLogin}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
