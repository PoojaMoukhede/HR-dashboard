import React from "react";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo.png'


export default function PageNotFound() {

    const navigate = useNavigate();
  return (
    <>
    
     <div className="pageNotFound">
        <img src={logo} alt="" style={{padding:'2rem',width:'17rem'}}/>
     <div className="error">
        <h1 className="code">404</h1>
        <h2 className="desc">Ops... Something's wrong here... !</h2>
        <h6>We cant't find the page you are looking for, head back to home</h6>
       <button className="btn btn0" onClick={()=>{navigate('/main')}}>
       <span>Home</span>
        <i className="bi bi-arrow-right" ><Icon icon="bi:arrow-right-short" style={{fontSize:'1.8rem'}}/></i>
       </button>   
      </div>
     </div>
    </>
  );
}
