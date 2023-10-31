import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAPI } from "../../../Context";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export default function EditHRModel({ selectedEmployee, open, onClose }) {
  const [showModal1, setshowModal1] = useState(false);
  //   const [lgShow, setLgShow] = useState(false);

  const [login, setLogin] = useState({
    name: "",
    email: "",
    phone_no: "",
    admin_city: "",
    admin_state: "",
    admin_country: "",
  });
  console.log(login);
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const { onFormSubmitEditAdmin } = useAPI();
  const handleshowModal1 = () => setshowModal1(true);
  const handleCloseModal = () => setshowModal1(false);

  const UserLogin = () => {
    onFormSubmitEditAdmin(selectedEmployee._id, login);
    handleCloseModal();
    // window.location.reload();
    // window.top.location = window.top.location
  };

  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedcity, setSelectedcity] = useState("");
  const handleCountryChange = (e) => {
    setCountryid(e.id);
    setLogin((prevEmployee) => ({
      ...prevEmployee,
      admin_country: e.name,
    }));
  };
  const handleStateChange = (e) => {
    setstateid(e.id);
    setLogin((prevEmployee) => ({
      ...prevEmployee,
      admin_state: e.name,
    }));
  };

  const handleCityChange = (e) => {
    setSelectedcity(e.id);
    setLogin((prevEmployee) => ({
      ...prevEmployee,
      admin_city: e.name,
    }));
  };
  useEffect(() => {
    if (selectedEmployee) {
      const emp = {
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        // password: selectedEmployee.password,
        // confirm_password: selectedEmployee.confirm_password,
        phone_no: selectedEmployee.phone_no,
        admin_city: selectedEmployee.admin_city,
        admin_state: selectedEmployee.admin_state,
        admin_country: selectedEmployee.admin_country,
      };

      setLogin(emp);
    }
  }, [selectedEmployee]);

  return (
    <>
      <Modal size="lg" show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="grid-row">
              <div className="grid-item">
                <Form.Group controlId="formName" style={{ marginTop: "1rem" }}>
                  <Form.Control
                    type="text"
                    placeholder="name"
                    onChange={(e) => handleChange(e)}
                    name="name"
                    value={login.name}
                  />
                </Form.Group>
              </div>
              <div className="grid-item">
                <Form.Group controlId="formPhone" style={{ marginTop: "1rem" }}>
                  <Form.Control
                    type="tel"
                    placeholder="Phone Number"
                    onChange={(e) => handleChange(e)}
                    name="phone_no"
                    maxLength="10"
                    minLength={10}
                    max="10"
                    value={login.phone_no}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group controlId="formEmail" style={{ marginTop: "1rem" }}>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                name="email"
                value={login.email}
              />
            </Form.Group>

            <div className="grid-row mt-3">
              <div className="grid-item">
                <CountrySelect
                  name="admin_country"
                  onChange={handleCountryChange}
                  placeHolder="Select Country"
                  value={login.admin_country}
                />
              </div>

              <div className="grid-item">
                <StateSelect
                  name="admin_state"
                  countryid={countryid}
                  onChange={handleStateChange}
                  placeHolder="Select State"
                  value={login.admin_state}
                />
              </div>
              <div className="grid-item">
                <CitySelect
                  name="admin_city"
                  countryid={countryid}
                  stateid={stateid}
                  onChange={handleCityChange}
                  value={login.admin_city}
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
