import React,{useState} from 'react'
// import './Login.css'
// import loginImg from '../../Image/amico.png'
import { useAPI } from '../Context'
import { useNavigate } from 'react-router-dom'
import logo from "../Images/multilogo.png";
import {Link} from 'react-router-dom'




export default function Register() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    name:'',
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    setLogin((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  const { signUpUser } = useAPI();
  const UserLogin = () => {
    signUpUser(login);
  };
  return (
    <section className="h-100 gradient-form" style={{backgroundColor:"#fff"}}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <img src={logo}
                      style={{width:" 105px"}} alt="logo" />
                    <h4 className="mt-1 mb-5 pb-1">Please login to your account</h4>
                  </div>
                  <form onSubmit={(e) => e.preventDefault()}>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example22">Name</label>
                      <input type="name" id="form2Example22" className="form-control"  placeholder='Name' onChange={(e) => handleChange(e)} name='name'/>
                      
                    </div>

                    <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example11">Username</label>
                      <input type="email" id="form2Example11" className="form-control"
                        placeholder="Email" onChange={(e) => handleChange(e)} name='email'/>
                    </div>
                    <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example22">Password</label>
                      <input type="password" id="form2Example22" className="form-control"  placeholder='Password' onChange={(e) => handleChange(e)} name='password'/>
                      
                    </div>
                    <div className="form-outline mb-4">
                    <label className="form-label" for="form2Example22">Re-Enter Password</label>
                      <input type="password" id="form2Example22" className="form-control"  placeholder='Password' onChange={(e) => handleChange(e)} name='confirm_password'/>
                      
                    </div>
  
                    <div className="text-center pt-1 mb-5 pb-1">
                     <button className="btn text-white btn-block fa-lg bg-happy-fisher mb-3" type="button"  onClick={UserLogin}>Register</button>
                      {/* <a className="text-muted" href="#!">Forgot password?</a> */}
                    </div>
  
                    <div className="d-flex align-items-center justify-content-center pb-4 ">
                      {/* <p className="mb-0 me-2">Don't have an account?</p> */}
                    <button type="button" className="btn btn-outline-danger ml-1" onClick={() => navigate("/login")}>Login</button>
                    </div>
  
                  </form>
  
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center bg-happy-fisher">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">We are more than just a company</h4>
                  <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
