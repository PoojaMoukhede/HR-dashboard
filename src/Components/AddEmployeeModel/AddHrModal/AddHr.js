import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAPI } from "../../../Context";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function Register() {
  const [showModal, setShowModal] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_no: "",
    admin_city: "",
    admin_state: "",
    admin_country: "",
  });
  // console.log(login);
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const { signUpHR } = useAPI();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const UserLogin = () => {
    signUpHR(login);
    handleCloseModal();
  };

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedcity, setSelectedcity] = useState("");

const handleCountryChange =(e)=>{
  setCountryid(e.id);
  setLogin((prevEmployee) => ({
        ...prevEmployee,
        admin_country: e.name,
      }));
}
const handleStateChange =(e)=>{
  setstateid(e.id);
  setLogin((prevEmployee) => ({
        ...prevEmployee,
        admin_state: e.name,
      }));
}

const handleCityChange =(e)=>{
  setSelectedcity(e.id);
  setLogin((prevEmployee) => ({
        ...prevEmployee,
        admin_city: e.name,
      }));
}


  return (
    <>
      <Button
        variant="primary"
        // onClick={handleShowModal}
        onClick={() => setLgShow(true)}
        style={{ marginLeft: "0.5rem", marginBottom: "0.5rem" }}
      >
        Create New Account
      </Button>

      <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="grid-row">
              <div className="grid-item">
                <Form.Group controlId="formName" style={{ marginTop: "1rem" }}>
                  {/* <Form.Label>HR Name</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="name"
                    onChange={(e) => handleChange(e)}
                    name="name"
                  />
                </Form.Group>
              </div>
              <div className="grid-item">
                <Form.Group controlId="formPhone" style={{ marginTop: "1rem" }}>
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    type="tel"
                    placeholder="Phone Number"
                    onChange={(e) => handleChange(e)}
                    name="phone_no"
                    maxLength="10"
                    minLength={10}
                    // max={10}
                    max="10"
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group controlId="formEmail" style={{ marginTop: "1rem" }}>
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                name="email"
              />
            </Form.Group>
            <div className="grid-row">
              <div className="grid-item">
                <Form.Group
                  controlId="formPassword"
                  style={{ marginTop: "1rem" }}
                >
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                    name="password"
                  />
                </Form.Group>
              </div>
              <div className="grid-item">
                <Form.Group
                  controlId="formConfirmPassword"
                  style={{ marginTop: "1rem" }}
                >
                  {/* <Form.Label>Re-Enter Password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="Re-Enter Password"
                    onChange={(e) => handleChange(e)}
                    name="confirm_password"
                  />
                </Form.Group>
              </div>
            </div>


            <div className="grid-row mt-3">
              <div className="grid-item">
                <CountrySelect
                 name="admin_country"
                 onChange={handleCountryChange}
                  placeHolder="Select Country"
                />
              </div>

              <div className="grid-item">
                <StateSelect
                 name="admin_state"
                  countryid={countryid}
                  onChange={handleStateChange}
                  placeHolder="Select State"
                />
              </div>
              <div className="grid-item">
                <CitySelect
                 name="admin_city"
                  countryid={countryid}
                  stateid={stateid}
                  onChange={handleCityChange}

                  placeHolder="Select City"
                />
              </div>
            </div>
            {/* </div> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={UserLogin}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
