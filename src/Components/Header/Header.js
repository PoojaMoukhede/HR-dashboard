import React from "react";
import m_logo from '../../Images/multispan-logo 2.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// import "./Header.css";

export default function Header() {
    const navigate = useNavigate();
    function handleLogout(){
      // e.preventDefault();
      localStorage.removeItem("token");
      sessionStorage.clear()
      localStorage.clear()
      window.location.replace('/login');
      navigate("/");
  }
  return (
    <>
            <div className="app-header header-shadow">
            <div className="app-header__logo">
                <img alt="" src={m_logo}/>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav" onClick={()=>handleLogout()}>
                        <span className="btn-icon-wrapper">
                            {/* <i className="fa fa-ellipsis-v fa-w-6"></i> */}
                            Logout
                        </span>
                    </button>
                </span>
            </div>  

        </div>    
    </>
  );
}
