import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; 
import { useAPI } from "../Context";
// import logo from "../Images/multilogo.png";

export default function Register() {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState({
    Emp_ID: "",
    name:"",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const { signUpUser } = useAPI();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const UserLogin = () => {
    signUpUser(login);
    handleCloseModal(); 
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
          {/* <img src={logo} style={{ width: "55px" }} alt="logo" /> */}
          {/* <h4 className="mt-1 mb-5 pb-1">Please register for your account</h4> */}
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Emp ID"
                onChange={(e) => handleChange(e)}
                name="Emp_ID"
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Employee Name</Form.Label>
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





// import React, { useState } from "react";
// // import './Login.css'
// // import loginImg from '../../Image/amico.png'
// import { useAPI } from "../Context";
// import { useNavigate } from "react-router-dom";
// import logo from "../Images/multilogo.png";
// import { Link } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [login, setLogin] = useState({
//     Emp_ID: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   });
//   const handleChange = (e) => {
//     setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
//   };
//   const { signUpUser } = useAPI();
//   const UserLogin = () => {
//     signUpUser(login);
//   };
//   return (
//     <div className="container h-100">
//       <div className="row d-flex justify-content-center align-items-center h-100">
//         <div className="col-xl-10">
//           <div className="card rounded-3 text-black">
//             <div className="row g-0">
//               <div className="col-lg-6">
//                 <div className="card-body p-md-5 mx-md-4">
//                   <div className="text-center">
//                     <Link to="/">
//                       <img src={logo} style={{ width: " 105px" }} alt="logo" />{" "}
//                     </Link>
//                     <h4 className="mt-1 mb-5 pb-1">
//                       Please login to your account
//                     </h4>
//                   </div>
//                   <form onSubmit={(e) => e.preventDefault()}>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" for="form2Example22">
//                         Name
//                       </label>
//                       <input
//                         type="name"
//                         id="form2Example22"
//                         className="form-control"
//                         placeholder="Name"
//                         onChange={(e) => handleChange(e)}
//                         name="name"
//                       />
//                     </div>

//                     <div className="form-outline mb-4">
//                       <label className="form-label" for="form2Example11">
//                         Username
//                       </label>
//                       <input
//                         type="email"
//                         id="form2Example11"
//                         className="form-control"
//                         placeholder="Email"
//                         onChange={(e) => handleChange(e)}
//                         name="email"
//                       />
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" for="form2Example22">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         id="form2Example22"
//                         className="form-control"
//                         placeholder="Password"
//                         onChange={(e) => handleChange(e)}
//                         name="password"
//                       />
//                     </div>
//                     <div className="form-outline mb-4">
//                       <label className="form-label" for="form2Example22">
//                         Re-Enter Password
//                       </label>
//                       <input
//                         type="password"
//                         id="form2Example22"
//                         className="form-control"
//                         placeholder="Password"
//                         onChange={(e) => handleChange(e)}
//                         name="confirm_password"
//                       />
//                     </div>

//                     <div className="text-center pt-1 mb-5 pb-1">
//                       <button
//                         className="btn text-white btn-block bg-happy-fisher mb-3"
//                         type="button"
//                         onClick={UserLogin}
//                       >
//                         Register
//                       </button>
//                       {/* <a className="text-muted" href="#!">Forgot password?</a> */}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//               <div className="col-lg-6 d-flex align-items-center bg-happy-fisher">
//                 <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                   <h4 className="mb-4">We are more than just a company</h4>
//                   <p className="small mb-0">
//                     Lorem ipsum dolor sit amet, consectetur adipisicing elit,
//                     sed do eiusmod tempor incididunt ut labore et dolore magna
//                     aliqua. Ut enim ad minim veniam, quis nostrud exercitation
//                     ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
