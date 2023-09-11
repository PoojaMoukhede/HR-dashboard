import React, { useState } from "react";
import m_logo from "../../Images/multispan-logo 2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";

// import "./Header.css";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  function handleLogout() {
    // e.preventDefault();
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/login");
    navigate("/");
  }
  function handleToggleSidebar() {
    console.log("sidebar toggle");
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="left">
            {" "}
            <img alt="" src={m_logo} />
          </div>
          <div className="right pt-4">
           
            {/* <div className="box"> */}
            <div class="notifications mt-1">
        {/* <i class="fa fa-bell"></i> */}
        <span className="mt-1 hover_icon">
              <Icon
            //   className="hover_icon"
                icon="zondicons:notification"
                color="#24a1e9"
                style={{ fontSize: "1.6rem" }}
              />
            </span>
        <span class="num">4</span>
        <ul className="ul_list">
            <li class="icon">
                <span class="icon"></span>
                <span class="text">Lorem ipsum dolor sit amet</span>
            </li>
            <li class="icon">
                <span class="icon"></span>
                <span class="text">Lorem ipsum dolor sit amet</span>
            </li>
            <li class="icon">
                <span class="icon"></span>
                <span class="text">Lorem ipsum dolor sit amet</span>
            </li>
            <li class="icon">
                <span class="icon"></span>
                <span class="text">Lorem ipsum dolor sit amet</span>
            </li>
        </ul>
    {/* </div> */}
            </div>
            <h6 className="d-flex gap-1">
              <Icon
                icon="healthicons:ui-user-profile"
                color="#24a1e9"
                style={{ fontSize: "2rem" }}
              />
              <p style={{ fontSize: "1.2rem" }}>
                {localStorage.getItem("email").split("@")[0]}
              </p>
            </h6>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              onClick={() => handleToggleSidebar()}
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
              onClick={() => handleLogout()}
            >
              <span className="btn-icon-wrapper">Logout</span>
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
