import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {fontSize:"1.5rem",marginRight:"0.5rem"}
export default function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleToggleSidebar() {
    console.log("sidebar toggle")
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/login");
    navigate("/");
  }

  // Function to handle item click and set the selected item
  function handleItemClick(item) {
    // alert(item)
    setSelected(item);
  }

  const getActiveClass = (item) => {
    // alert('triggred')
    return item === selected ? "activate" : "";
  };
  const location = useLocation();
  const currentPath = location.pathname;


  console.log({currentPath});
  return (
    <>
      <div
        className={`app-sidebar sidebar-shadow ${
          isSidebarOpen ? "" : "closed-sidebar"
          // isSidebarOpen === true ? setIsSidebarOpen(false) : setIsSidebarOpen(true)
        }`}
      >
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
{/* dfdafafafafd */}

toggler

              <span className="btn-icon-wrapper">
                 <i className="fa fa-ellipsis-v fa-w-6"></i>
               </span>
            </button>
          </span>
        </div>
        <div className="scrollbar-sidebar">
          <div className="app-sidebar__inner mt-3">
            <ul className="vertical-nav-menu ">
              <Link to="/main">

                <li
                  className={` item_s app-sidebar__heading ${currentPath=='/main'?'activate':''}`}
                  onClick={() => handleItemClick("/main")}
                >
                  <Icon icon="icon-park-outline:dashboard" style={style} />
                  Dashboards
                </li>
              </Link>
              <Link to="/members">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/members"
                  )}`}
                  onClick={() => handleItemClick("/members")}
                >
                  <Icon icon="clarity:employee-group-line"  style={style}  />
                  Employee
                </li>
              </Link>
              <Link to="/attandance">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/attandance"
                  )}`}
                  onClick={() => handleItemClick("/attandance")}
                >
                  <Icon icon="simple-line-icons:calender" style={style}  />
                  Attendance
                </li>
              </Link>
              
              <Link to="/managers">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/managers"
                  )}`}
                  onClick={() => handleItemClick("/managers")}
                >
                  <Icon icon="majesticons:users-line" style={style}  />
                  Managers
                </li>
              </Link>
              <Link to="/expanse">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/expanse"
                  )}`}
                  onClick={() => handleItemClick("/expanse")}
                >
                  <Icon icon="grommet-icons:money" style={style} />
                  Expense Report
                </li>
              </Link>
              <Link to="/complaint">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/complaint"
                  )}`}
                  onClick={() => handleItemClick("/complaint")}
                >
                  <Icon icon="material-symbols:support-agent"  style={style} />
                  Complaint
                </li>
              </Link>
              <Link to="/calender">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/calender"
                  )}`}
                  onClick={() => handleItemClick("/calender")}
                >
                  <Icon icon="uil:calender"  style={style} />
                  Calender View
                </li>
              </Link>
              <Link to="/canteen">
                <li
                  className={` item_s app-sidebar__heading ${getActiveClass(
                    "/calender"
                  )}`}
                  onClick={() => handleItemClick("/canteen")}
                >
                  <Icon icon="ep:food"  style={style} />
                  Canteen facility
                </li>
              </Link>
              {/* Repeat this pattern for other sidebar items */}
              <li
                className=" item_s app-sidebar__heading"
                onClick={handleLogout}
              >
                <Icon icon="tabler:logout"  style={style} />
                Logout
              </li>
            </ul>
           </div>
        </div>
      </div>
    </>
  );
}

