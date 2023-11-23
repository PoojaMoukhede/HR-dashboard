import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./AddMember.css";
import Select from "@mui/material/Select";
import { CountryDropdown } from "react-country-region-selector";
import MenuItem from "@mui/material/MenuItem";
import { useAPI } from "../../Context";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddEmployeeModal = ({ open, onClose }) => {
  const [country, setCountry] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    // id: Date.now(),
    Emp_ID: false,
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
    password: "",
    confirm_password: "",
    Emp_country: "",
    Emp_designation: "",
  });

  const [enteredIDs, setEnteredIDs] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
    if (name === "Emp_contact_No" && value.length === 10) {
      setNewEmployee({ ...newEmployee, [name]: value });
    } else if (name === "Emp_contact_No" && value.length < 10) {
      console.error("Contact number must be 10 characters long.");
      // alert('Contact number must be 10 characters long.')
    }

    if (value.trim() === "") {
      setEmptyFields({
        ...emptyFields,
        [name]: true,
      });
    }
    if (name === "Emp_ID" && enteredIDs.includes(value)) {
      alert("Employee ID is not unique!");
    } else {
      setEmptyFields({
        ...emptyFields,
        [name]: false,
      });
    }
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const { onFormSubmit } = useAPI();
  const { signUpUser } = useAPI();
  const [emptyFields, setEmptyFields] = useState({});
  const onFormSubmit1 = (e) => {
    const emptyFieldNames = [];

    if (!isEmailValid(newEmployee.email)) {
      alert("Invalid email format");
      return;
    }
    if (!validateContactNumber(newEmployee.Emp_contact_No)) {
      alert("Invalid contact number. Please enter a 10-digit number.");
      return;
    }

    if (!newEmployee.Emp_name) {
      emptyFieldNames.push("Employee Name");
    }
    if (!newEmployee.email) {
      emptyFieldNames.push("Employee Email");
    }
    if (!newEmployee.Emp_contact_No) {
      emptyFieldNames.push("Employee Contact Number");
    }
    if (!newEmployee.Emp_qualification) {
      emptyFieldNames.push("Employee Qualification");
    }
    if (!newEmployee.Emp_department) {
      emptyFieldNames.push("Employee Department");
    }

    if (!newEmployee.Emp_expertise) {
      emptyFieldNames.push("Employee Expertise");
    }

    if (!newEmployee.Emp_blood_group) {
      emptyFieldNames.push("Employee Blood Group");
    }

    if (!newEmployee.password) {
      emptyFieldNames.push("Employee Password");
    }
    if (!newEmployee.confirm_password) {
      emptyFieldNames.push("Employee Confirm Passwordr");
    }
    if (!newEmployee.Emp_state) {
      emptyFieldNames.push("Employee State");
    }
    if (!newEmployee.Emp_city) {
      emptyFieldNames.push("Employee City");
    }
    if (!newEmployee.Emp_DOB) {
      emptyFieldNames.push("Employee Date of Birth");
    }
    if (!newEmployee.Emp_joining_date) {
      emptyFieldNames.push("Employee Joining Date");
    }
    if (enteredIDs.includes(newEmployee.Emp_ID)) {
      emptyFieldNames.push("Employee ID is not unique!");
      alert("Employee ID is not unique!");
      // You can prevent the form submission or display an error message here
      return;
    }
    if (emptyFieldNames.length > 0) {
      alert(
        `Please fill in the following required field(s): ${emptyFieldNames.join(
          ", "
        )}`
      );
      return;
    }
    signUpUser(newEmployee);
    window.location.reload();
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContactNumber = (tel) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(tel);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
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

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

const department_list = {
  Software:[
    'Web Application Developer',
    'Intern',
    'Front-end Developer',
    'Backend Developer',
    'Software Engineer',
    'Embedded Softeware Engineer',
    'Team Leader',
    'Project Manager'
  ],
  Sales:[
    'Sales Executive',
    'Marketing Manager',
    'Customer Service Representative',
    'Intern',
  ],
  Service:[
    'Service Engineer',
    'Intern',
    'Technician'
  ],
  Accounting:[
    'Accounting Manager',
    'Financial Analyst',
    'Intern',
  ],
  HR:[
    'Intern',
    'Human Resource Assistant',
    'Recruiter',
    'HR Officer',
  ],
  Resarch_Development:[
    'Research and Development Intern',
    'Technician'
  ],
  Billing:[
    'Intern',
    'Billing Specialist',
    'Receptionist',
  ],
  Production:[
    'Manager',
    'Production Planner',
    'Intern',
  ]
}

const handleDepartmentChange = (event) => {
  const department = event.target.value;
  setSelectedDepartment(department);
  setSelectedDesignation("");

  setNewEmployee((prevEmployee) => ({
    ...prevEmployee,
    Emp_department: department,
  }));
};
const handleDesignationChange = (event) => {
  const DesignationValue = event.target.value;
  setSelectedDesignation(DesignationValue);

  setNewEmployee((prevEmployee) => ({
    ...prevEmployee,
    Emp_designation: DesignationValue,
  }));
};

const Options = selectedDepartment
    ? department_list[selectedDepartment].map((Emp_designation) => (
        <MenuItem key={Emp_designation} value={Emp_designation}>
          {Emp_designation}
        </MenuItem>
      ))
    : null;


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
            <h2>Add New Employee</h2>
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
                    className={
                      emptyFields.Emp_name ? "input-field-error" : "input-field"
                    }
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="TEXT"
                    name="Emp_ID"
                    label="Employee ID"
                    value={newEmployee.Emp_ID}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    className={
                      emptyFields.Emp_ID ? "input-field-error" : "input-field"
                    }
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
                    className={
                      emptyFields.email ? "input-field-error" : "input-field"
                    }
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
                    className={
                      emptyFields.Emp_qualification
                        ? "input-field-error"
                        : "input-field"
                    }
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
                    className={
                      emptyFields.Emp_contact_No
                        ? "input-field-error"
                        : "input-field"
                    }
                  />
                </div>
              </div>

              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="password"
                    label="password"
                    value={newEmployee.password}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    className={
                      emptyFields.password ? "input-field-error" : "input-field"
                    }
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="confirm_password"
                    label="confirm_password"
                    value={newEmployee.confirm_password}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    className={
                      emptyFields.confirm_password
                        ? "input-field-error"
                        : "input-field"
                    }
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
                    // value={newEmployee.Emp_department}
                    // onChange={handleInputChange}
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className={
                      emptyFields.Emp_department
                        ? "input-field-error"
                        : "input-field"
                    }
                    // onChange={handleInputChange}
                  >
                    {/* <MenuItem>Select</MenuItem>
                    <MenuItem value="Software">Software</MenuItem>
                    <MenuItem value="Sales">Sales & Marketing</MenuItem>
                    <MenuItem value="Service">Service</MenuItem>
                    <MenuItem value="Accounting">Accounting</MenuItem>
                    <MenuItem value="HR">Human Resources</MenuItem>
                    <MenuItem value="RD">Research & Development</MenuItem>
                    <MenuItem value="HR">Billing</MenuItem>
                    <MenuItem value="RD">Production</MenuItem> */}
                    <MenuItem>Select</MenuItem>
                    {Object.keys(department_list).map((depart) => (
                      <MenuItem value={depart} key={depart}>
                        {depart}
                      </MenuItem>
                    ))}
                  </Select>
       
                </div>
                <div className="grid-item">
                  {/* <TextField
                    type="text"
                    name="Emp_designation"
                    label="Designation"
                    // value={newEmployee.Emp_designation}
                    value={selectedDesignation}
                    // onChange={handleInputChange}
                    onChange={handleDesignationChange}
                    fullWidth
                    margin="normal"
                    required
                  /> */}
                    <label>Designation</label>
                   <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    type="text"
                    name="Emp_designation"
                    label="Designation"
                    value={selectedDesignation}
                    onChange={handleDesignationChange}
                    fullWidth
                    margin="normal"
                    required
                  >
                    <MenuItem value="">Select</MenuItem>
                    {Options}
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
                    style={{
                      width: "23.25rem",
                      height: "3.3rem",
                      marginTop: "5px",
                      maxWidth: "100%",
                    }}
                    max={getCurrentDate()}
                    className={
                      emptyFields.Emp_DOB ? "input-field-error" : "input-field"
                    }
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
                    className={
                      emptyFields.Emp_joining_date
                        ? "input-field-error"
                        : "input-field"
                    }
                  />
                </div>
              </div>

              <div className="grid-row mt-2">
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
                    className={
                      emptyFields.Emp_blood_group
                        ? "input-field-error"
                        : "input-field"
                    }
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
                <div className="grid-item mt-4">
                  <TextField
                    type="text"
                    name="Emp_expertise"
                    label="Expertise"
                    value={newEmployee.Emp_expertise}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    className={
                      emptyFields.Emp_expertise
                        ? "input-field-error"
                        : "input-field"
                    }
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
                onClick={onFormSubmit1}
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

export default AddEmployeeModal;
