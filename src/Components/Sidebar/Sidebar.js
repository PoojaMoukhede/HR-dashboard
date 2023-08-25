import React from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// import './Sidebar.css'

export default function Sidebar() {
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
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src"></div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6"></i>
              </span>
            </button>
          </span>
        </div>
        <div className="scrollbar-sidebar">
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu">
            <Link to='/main'> <li className="app-sidebar__heading">Dashboards</li></Link>
             <Link to='/members'><li className="app-sidebar__heading">Employee</li></Link> 
             <Link to='/attandance'> <li className="app-sidebar__heading">Attandance</li></Link> 
             <Link to='/complaint'><li className="app-sidebar__heading">Complaint</li></Link> 
              <Link to='/managers'><li className="app-sidebar__heading">Managers</li></Link>
              <li className="app-sidebar__heading" onClick={()=>handleLogout()}>Logout</li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
