// import React, { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Backdrop from "@mui/material/Backdrop";
// import Fade from "@mui/material/Fade";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import "./AddMember.css";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import { useAPI } from "../../Context";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";


// const AddManagers = ({ open, onClose }) => {
  
//   const [newManager, setnewManager] = useState({
//     name: "",
//     email: "",
//     contact_no: "",
//     city: "",
//     state: "",
//     country:"",
//     blood_group: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setnewManager((prevEmployee) => ({
//       ...prevEmployee,
//       [name]: value,
//     }));
//   };


//   const { onFormSubmit21 } = useAPI();
// const onFormSubmit1 = (e) => {
//   if (!isEmailValid(newManager.email)) {
//     alert("Invalid email format");
//     return;
//   }
//   if (!validateContactNumber(newManager.contact_no)) {
//     alert("Invalid contact number. Please enter a 10-digit number.");
//     return;
//   }
//   onFormSubmit21(newManager)
//     .then(() => {
//       window.location.reload();
//       console.log("new-------", newManager);
//     })
//     .catch((error) => {
//       console.error("Error adding newManager to the database:", error);
//     });
// };


//   const isEmailValid = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };
//   const validateContactNumber = (tel) => {
//     const pattern = /^[0-9]{10}$/; // Simple pattern for a 10-digit number
//     return pattern.test(tel);
//   };

//   const [countryid, setCountryid] = useState(0);
//   const [stateid, setstateid] = useState(0);
//   const [selectedcity, setSelectedcity] = useState("");

//   const handleCountryChange = (e) => {
//     setCountryid(e.id);
//     setnewManager((prevEmployee) => ({
//       ...prevEmployee,
//       country: e.name,
//     }));
//   };
//   const handleStateChange = (e) => {
//     setstateid(e.id);
//     setnewManager((prevEmployee) => ({
//       ...prevEmployee,
//       state: e.name,
//     }));
//   };

//   const handleCityChange = (e) => {
//     setSelectedcity(e.id);
//     setnewManager((prevEmployee) => ({
//       ...prevEmployee,
//       city: e.name,
//     }));
//   };




//   return (
//     <>
//       <Modal
//         open={open}
//         onClose={onClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <div className="modal-container">
//             <h2>Add New Manager</h2>
//             <div className="grid-container">
//             <div className="grid-row">
//                 <div className="grid-item">
//                   <TextField
//                     type="text"
//                     name="name"
//                     label="Name"
//                     value={newManager.name}
//                     onChange={handleInputChange}
//                     fullWidth
//                     margin="normal"
//                     required
//                   />
//                 </div>
//                 </div>
//               <div className="grid-row">
//                 <div className="grid-item">
//                   <TextField
//                     type="text"
//                     name="department"
//                     label="Department"
//                     value={newManager.department}
//                     onChange={handleInputChange}
//                     fullWidth
//                     margin="normal"
//                     required
//                   />
//                 </div>
//                 <div className="grid-item">
//                   <TextField
//                     type="tel"
//                     name="contact_no"
//                     label="Contact Number"
//                     value={newManager.contact_no}
//                     onChange={handleInputChange}
//                     fullWidth
//                     margin="normal"
//                     required
//                     inputProps={{
//                       inputMode: 'numeric', // Specify numeric input mode
//                       pattern: '[0-9]{10}', // Specify a pattern for 10 digits
//                       maxLength: 10, // Limit the input to 10 characters
//                       minLength:10
//                     }}
//                   />
//                 </div>
//               </div>

//               <div className="grid-row">
//                 <div className="grid-item mt-4">
//                   <TextField
//                     type="email"
//                     name="email"
//                     label="E-mail"
//                     value={newManager.email}
//                     onChange={handleInputChange}
//                     fullWidth
//                     margin="normal"
//                     required
//                   />
//                 </div>
//                 <div className="grid-item">
//                 <label>Blood Group</label>
//                 <Select
//                     type="text"
//                     name="Emp_blood_group"
//                     label="Blood Group"
//                     value={newManager.blood_group}
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     style={{ color: "black" }}
//                     fullWidth
//                     onChange={handleInputChange}
//                     className={
//                       newManager.blood_group
//                         ? "input-field-error"
//                         : "input-field"
//                     }
//                     // onChange={handleInputChange}
//                   >
//                     <MenuItem>Select</MenuItem>
//                     <MenuItem value="O+">O+</MenuItem>
//                     <MenuItem value="O-">O-</MenuItem>
//                     <MenuItem value="AB+">AB+</MenuItem>
//                     <MenuItem value="AB-">AB-</MenuItem>
//                     <MenuItem value="A-">A-</MenuItem>
//                     <MenuItem value="A+">A+</MenuItem>
//                     <MenuItem value="B-">B-</MenuItem>
//                     <MenuItem value="B+">B+</MenuItem>
//                   </Select>
//                 </div>
//               </div>

//               <div className="grid-row mt-3">
//                 <div className="grid-item">
//                   <CountrySelect
//                     name="country"
//                     onChange={handleCountryChange}
//                     placeHolder="Select Country"
//                   />
//                 </div>

//                 <div className="grid-item">
//                   <StateSelect
//                     name="state"
//                     countryid={countryid}
//                     onChange={handleStateChange}
//                     placeHolder="Select State"
//                   />
//                 </div>
//                 <div className="grid-item">
//                   <CitySelect
//                     name="city"
//                     countryid={countryid}
//                     stateid={stateid}
//                     onChange={handleCityChange}
//                     placeHolder="Select City"
//                   />
//                 </div>
//               </div>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={onFormSubmit1}
//               >
//                 Add Employee
//               </Button>
//             </div>
//           </div>
//         </Fade>
//       </Modal>
//     </>
//   );
// };

// export default AddManagers;
