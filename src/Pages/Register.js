import React from 'react'
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom'

export default function Register() {
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
											<div className="form-group">
												<input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autocomplete="off"/>
												<i className="input-icon uil uil-at"><Icon icon="entypo:email"/></i>
											</div>	
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autocomplete="off"/>
												<i className="input-icon "><Icon icon="uil:lock-alt" /></i>
											</div>
											<Link to="/main"><button className="btn btn2 mt-4">submit</button></Link>
                            				<p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
				      					</div>
			      					</div>
			      				</div>

								<div className="card-back">
									<div className="center-wrap">
										<div className="section2 text-center">
											<h4 className="mb-4 pb-3">Sign Up</h4>
											
											<div className="form-group mt-2">
												<input type="email" name="logemail" className="form-style" placeholder="Enter Email" id="logemail" autocomplete="off"/>
												<i className="input-icon uil uil-at"><Icon icon="entypo:email" /></i>
											</div>	
											
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Enter Password" id="logpass" autocomplete="off"/>
												<i className="input-icon "><Icon icon="uil:lock-alt" /></i>
											</div>
											<div className="form-group mt-2">
												<input type="password" name="logpass" className="form-style" placeholder="Re-enter Password" id="logpass" autocomplete="off"/>
												<i className="input-icon "><Icon icon="uil:lock-alt" /></i>
											</div>
											<Link to="/main"><button className="btn btn2 mt-4">submit</button></Link>
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
