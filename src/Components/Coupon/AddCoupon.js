
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../AddEmployeeModel/AddMember.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const AddCoupon = ({ open, onClose }) => {

  // const [menuItem,setMenuItems] = useState([])
  const [newMenu, setNewMenu] = useState({
    date: "",
    menu: "",
  });

  const onMenuSubmit = () => {
    const data = { ...newMenu };

    axios
      .post('https://dashboardbackend-production-9839.up.railway.app/menu', data)
      .then((res) => {
        const { date, menu } = res.data;
        console.log('Response:', res );
        console.log('Response status:', res.status ); // Add this line for debugging
        if (res.status === 201) {
          toast.success('Menu added successfully');
        } else if (res.status === 400) {
          console.log('Menu already exists for this date'); // Add this line for debugging
          toast.error('Menu already exists for this date');
        } else {
          console.error('Unexpected response:', res.data); // Add this line for debugging
        }
        setNewMenu({ date: "", menu: "" });
        console.log(date, menu);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenu((menu_new) => ({
      ...menu_new,
      [name]: value,
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
            <h2>Add New Menu</h2>
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="date"
                    name="date"
                    label="Date"
                    value={newMenu.date}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="menu"
                    label="Today's Menu"
                    value={newMenu.menu}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={onMenuSubmit}
              >
                Add Menu
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddCoupon;
