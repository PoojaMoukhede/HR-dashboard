import React,{useState} from 'react'
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom'
import { useAPI } from '../Context'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
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



	const { loginUser } = useAPI();
	const [login1, setLogin1] = useState({
	  email: "",
	  password: "",
	});
	const handleChange1 = (e) => {
	  setLogin1((curr) => ({ ...curr, [e.target.name]: e.target.value }));
	};
	const UserLogin1 = () => {
	  loginUser(login1);
	};


  return (
    <>
	<div className="section">
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-center py-5">
					<div className="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
			          	<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">
								<div className="card-front">
									<div className="center-wrap">
										<div className="section2 text-center">
											<h4 className="mb-4 pb-3">Log In</h4>
											<form onSubmit={(e) => e.preventDefault()}>
											<div className="form-group">
												<input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off" onChange={(e) => handleChange1(e)}/>
												<i className="input-icon uil uil-at"><Icon icon="entypo:email"/></i>
											</div>	
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off" onChange={(e) => handleChange1(e)}/>
												<i className="input-icon "><Icon icon="uil:lock-alt" /></i>
											</div>
											<Link to="/main"><button className="btn btn2 mt-4" onClick={UserLogin1}>submit</button></Link>
                            				<p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
											</form>
				      					</div>
			      					</div>
			      				</div>

								<div className="card-back">
									<div className="center-wrap">
										<div className="section2 text-center">
											<h4 className="mb-4 pb-3">Sign Up</h4>
											<form onSubmit={(e) => e.preventDefault()}>
											<div className="form-group mt-2">
												<input type="email" name="logemail" className="form-style" placeholder="Enter Email" id="logemail" autocomplete="off" onChange={(e) => handleChange(e)}/>
												<i className="input-icon uil uil-at"><Icon icon="entypo:email" /></i>
											</div>	
											
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Enter Password" id="logpass" autocomplete="off" onChange={(e) => handleChange(e)}/>
												<i className="input-icon "><Icon icon="uil:lock-alt" /></i>
											</div>
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Re-enter Password" id="logpass" autocomplete="off" onChange={(e) => handleChange(e)}/>
												<i className="input-icon "><Icon icon="uil:lock-alt" /></i>
											</div>
											<Link to="/main"><button className="btn btn2 mt-4" onClick={UserLogin}>submit</button></Link>
											</form>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
    </>
  )
}
