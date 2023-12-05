import React, { useState } from "react";
import logo from "../Images/multilogo.png";
import { Link } from "react-router-dom";
import { useAPI } from "../Context";
import Cookies from 'js-cookie';

export default function Login() {
  const { loginUser } = useAPI();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
    //for validation
    // const newPassword = e.target.value;
    // setPassword(newPassword);
    // validatePassword(newPassword);
  };
  const UserLogin = () => {
    loginUser(login);
    // Cookies.set('isLoggedIn', 'true');
  };

  // const [password, setPassword] = useState('');
  // const [isValid, setIsValid] = useState(false);
  // const validatePassword = (password) => {
  //   const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  //   const isValidPassword = passwordPattern.test(password);

  //   setIsValid(isValidPassword);
  // };

  

 return (
    <>
      <section
        className="gradient-form"
        // style={{ backgroundColor: "#fff" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <Link to="/">
                          <img
                            src={logo}
                            style={{ width: " 105px" }}
                            alt="logo"
                          />
                        </Link>
                        <h4 className="mt-1 mb-5 pb-1">
                          Please login to your account
                        </h4>
                      </div>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example11">
                            Username
                          </label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email"
                            onChange={(e) => handleChange(e)}
                            // onClick={(e)=>setEmail(e.target.value)}
                            name="email"
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example22">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                            onChange={(e) => handleChange(e)}
                            name="password"
                          />

                          {/* <input
        type="password"
        id="form2Example22"
        className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
        placeholder="Password"
        onChange={handleChange}
        name="password"
      />
      {isValid ? (
        <div className="valid-feedback">Password is valid</div>
      ) : (
        <div className="invalid-feedback">Password must be 8 characters with at least one uppercase letter, one lowercase letter, one special character, and one number.</div>
      )} */}
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn text-white btn-block  bg-happy-fisher mb-3"
                            type="button"
                            onClick={UserLogin}
                          >
                            Log in
                          </button>
                          {/* <a className="text-muted" href="#!">
                            Forgot password?
                          </a> */}
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-center pb-4 ">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <Link to="/register">
                            <button
                              type="button"
                              className="btn btn-outline-danger ml-1"
                            >
                              Create new
                            </button>
                          </Link>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center bg-happy-fisher">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Multispan Control Instruments Pvt Ltd' has formed in
                        1986 in a modest 1200 sq ft workshop on the concepts of
                        offering user-friendly innovation-based panel-mounted
                        Temperature controllers for injection moulding,
                        extrusion units, and other plastic processing machinery
                        manufacturers in India. Thanks to the company's R&D
                        efforts, more than 50 products were converted to
                        microcontroller technology between 1995 and 2000. About
                        3500 square feet of space were devoted to the company's
                        set up in that year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
