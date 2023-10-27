import React, { useState, createContext, useContext } from "react";
import m_logo from "../../Images/multispan-logo 2.png";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import DropDown from "../DropDown";
import { ThemeContext } from "../Header/ThemeProvider";
import Button from "react-bootstrap/Button";


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

  // const documentBody = document.body;

  // function handleOnChange(){
  //   let theme = getTheme();

  //   if(theme === 'dark') {
  //       setTheme('light');
  //   } else {
  //       setTheme('dark');
  //   }
  // }

  // //functions
  // function changeBackground () {
  //     let theme = getTheme();

  //     if(theme === 'dark') {
  //         documentBody.classList.add('active');
  //     } else {
  //         documentBody.classList.remove('active');
  //     }
  // }

  // function checkTheme() {
  //     let theme = getTheme();
  //     if(theme == null || theme === undefined || typeof(theme) != 'string') {
  //         setTheme('light');
  //     } else {
  //         if(theme === 'dark') {
  //             setTheme('dark');
  //         } else {
  //             setTheme('light');
  //         }
  //     }
  // }

  // function setTheme(theme = 'light') {
  //     window.localStorage.setItem('theme', theme);
  //     changeBackground();
  // }

  // function getTheme(){
  //     return window.localStorage.getItem('theme');
  // }

  // checkTheme();

  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="left">
            {" "}
            <img alt="" src={m_logo} />
          </div>
          {/* <input
            type="checkbox"
            name="switcher"
            id="switcher-input"
            class="switcher-input"
            // onChange={handleOnChange}
          />
        
          <label class="switcher-label" for="switcher-input">
            <i class="fas fa-solid fa-moon"></i>
            <span class="switcher-toggler"></span>
            <i class="fas fa-solid fa-sun"></i>
          </label> */}
          <div className="right pt-2">
            <div className="notifications mt-1">
              <span className="mt-1 hover_icon">
                <Icon
                  icon="zondicons:notification"
                  color="#24a1e9"
                  style={{ fontSize: "1.6rem" }}
                />
              </span>

              <span className="num">4</span>
              {/* <ul className="ul_list">
                <li className="icon">
                  <span className="icon"></span>
                  <span className="text">Lorem ipsum dolor sit amet</span>
                </li>
                <li className="icon">
                  <span className="icon"></span>
                  <span className="text">Lorem ipsum dolor sit amet</span>
                </li>
                <li className="icon">
                  <span className="icon"></span>
                  <span className="text">Lorem ipsum dolor sit amet</span>
                </li>
                <li className="icon">
                  <span className="icon"></span>
                  <span className="text">Lorem ipsum dolor sit amet</span>
                </li>
              </ul> */}
            </div>

            <Button style={{backgroundColor:"#fafbfc",border:"none",color:"black",paddingTop:'0'}} href="/profile">
        
        <Icon
          icon="healthicons:ui-user-profile"
          color="#24a1e9"
          style={{ fontSize: "2rem", marginRight: "0.5rem" }}
        />
        {localStorage.getItem("email").split("@")[0]}
      </Button>
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
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav "
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
