import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../AddMember.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAPI } from "../../../Context";
import { useEffect } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


const EditEmployeeModal = ({ open, onClose, selectedEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    // id: Date.now(),
    Emp_ID: "",
    Emp_name: "",
    email: "",
    Emp_contact_No: "",
    Emp_department: "",
    Emp_city: "",
    Emp_state: "",
    Emp_DOB: "",
    Emp_joining_date: "",
    Emp_blood_group: "",
    Emp_qualification: "",
    Emp_expertise: "",
    Emp_country: "",
    Emp_designation: "",
  });
  // console.log(`selectedEmployee ${selectedEmployee}`);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };
;
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { onFormSubmitEdit } = useAPI();
  const onFormSubmit11 = (e) => {
    onFormSubmitEdit(selectedEmployee._id, newEmployee);

    if (!isEmailValid(newEmployee.email)) {
      alert("Invalid email format");
      return;
    }
    // window.location.reload();
    console.log(newEmployee);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (selectedEmployee) {
      const emp = {
        Emp_ID: selectedEmployee.Emp_ID,
        Emp_name: selectedEmployee.Emp_name,
        email: selectedEmployee.email,
        Emp_contact_No: selectedEmployee.Emp_contact_No,
        Emp_department: selectedEmployee.Emp_department,
        Emp_city: selectedEmployee.Emp_city,
        Emp_state: selectedEmployee.Emp_state,
        Emp_DOB: selectedEmployee.Emp_DOB,
        Emp_joining_date: selectedEmployee.Emp_joining_date,
        Emp_blood_group: selectedEmployee.Emp_blood_group,
        Emp_qualification: selectedEmployee.Emp_qualification,
        Emp_expertise: selectedEmployee.Emp_expertise,
        Emp_country:selectedEmployee.Emp_country,
        Emp_designation:selectedEmployee.Emp_designation
      };

      setNewEmployee(emp);
    }
  }, [selectedEmployee]);
  
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedcity, setSelectedcity] = useState("");

  const handleCountryChange = (e) => {
    setCountryid(e.id);
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      Emp_country: e.name,
    }));
  };
  const handleStateChange = (e) => {
    setstateid(e.id);
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      Emp_state: e.name,
    }));
  };

  const handleCityChange = (e) => {
    setSelectedcity(e.id);
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      Emp_city: e.name,
    }));
  };



  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-container">
            <h2>Edit Employee</h2>
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_name"
                    label="Employee Name"
                    value={newEmployee.Emp_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_ID"
                    label="Employee ID"
                    value={newEmployee.Emp_ID}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
              </div>
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="email"
                    name="email"
                    label="Employee E-mail"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                
              </div>
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_qualification"
                    label="Qualification"
                    value={newEmployee.Emp_qualification}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_expertise"
                    label="Expertise"
                    value={newEmployee.Emp_expertise}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
              </div>

              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_designation"
                    label="Designation"
                    value={newEmployee.Emp_designation}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="tel"
                    name="Emp_contact_No"
                    label="Employee Contact Number"
                    value={newEmployee.Emp_contact_No}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]{10}",
                      maxLength: 10,
                      minLength: 10,
                    }}
                  />
                </div>
              </div>


              <div className="grid-row">
                <div className="grid-item">
                  <label>Department</label>
                  <Select
                    type="text"
                    name="Emp_department"
                    label="Department"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ color: "black" }}
                    fullWidth
                    value={newEmployee.Emp_department}
                    onChange={handleInputChange}

                    // onChange={handleInputChange}
                  >
                    <MenuItem>Select</MenuItem>
                    <MenuItem value="Software">Software</MenuItem>
                    <MenuItem value="Sales">Sales & Marketing</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                    <MenuItem value="Accounting">Accounting</MenuItem>
                    <MenuItem value="HR">Human Resources</MenuItem>
                    <MenuItem value="RD">Research & Development</MenuItem>
                  </Select>
                </div>
                <div className="grid-item">
                  <label>Blood Group</label>
                  <Select
                    type="text"
                    name="Emp_blood_group"
                    label="Blood Group"
                    value={newEmployee.Emp_blood_group}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{ color: "black" }}
                    fullWidth
                    onChange={handleInputChange}

                    // onChange={handleInputChange}
                  >
                    <MenuItem>Select</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="grid-row mt-2">
                <div className="grid-item ">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    name="Emp_DOB"
                    value={newEmployee.Emp_DOB}
                    onChange={handleInputChange}
                    required
                    max={getCurrentDate()}
                    style={{
                      width: "23.25rem",
                      height: "3.3rem",
                      marginTop: "5px",
                      maxWidth: "100%",
                    }}
                  />
                </div>

                <div className="grid-item">
                  <label>Date of Joining</label>
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    name="Emp_joining_date"
                    required
                    value={newEmployee.Emp_joining_date}
                    onChange={handleInputChange}
                    style={{
                      width: "23.25rem",
                      height: "3.3rem",
                      marginTop: "5px",
                      maxWidth: "100%",
                    }}
                    min="2010-01-01"
                    max={getCurrentDate()}
                  />
                </div>
              </div>


              <div className="grid-row mt-3">
                <div className="grid-item">
                  <CountrySelect
                    name="Emp_country"
                    onChange={handleCountryChange}
                    placeHolder="Select Country"
                  />
                </div>

                <div className="grid-item">
                  <StateSelect
                    name="Emp_state"
                    countryid={countryid}
                    onChange={handleStateChange}
                    placeHolder="Select State"
                  />
                </div>
                <div className="grid-item">
                  <CitySelect
                    name="Emp_city"
                    countryid={countryid}
                    stateid={stateid}
                    onChange={handleCityChange}
                    placeHolder="Select City"
                  />
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={onFormSubmit11}
              >
                Add Employee
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EditEmployeeModal;
