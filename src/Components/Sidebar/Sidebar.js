import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


// { showDetailItem } for item detail
const style = { fontSize: "1.5rem", marginRight: "0.5rem" };
export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/login");
  }

  // Function to handle item click and set the selected item
  function handleItemClick(item) {
    // alert(item)
    setSelected(item);
  }

  const getActiveClass = (item) => {
    return item === selected ? "activate" : "";
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const superAdminCredentials = {
    email: "superadmin@yopmail.com",
    password: "Admin@123",
  };

  const isSuperAdmin = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("email");
    return user === superAdminCredentials.email;
  };

  return (
    <>
      <div
        className={`app-sidebar sidebar-shadow ${
          isSidebarOpen ? "" : "closed-sidebar"
          // isSidebarOpen === true ? setIsSidebarOpen(false) : setIsSidebarOpen(true)
        }`}
      >
        <div className="app-header">
          {/* <div className="logo-src"></div> */}
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
          <div className="app-sidebar__inner mt-3">
            <ul className="vertical-nav-menu ">
              <Link to="/dashboard">
                <li
                  className={`item_s app-sidebar__heading ${
                    currentPath === "/dashboard" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/dashboard")}
                >
                  <Icon icon="icon-park-outline:dashboard" style={style} />
                  Dashboards
                </li>
              </Link>

              {/* <Link to="/details">
                <li
                  className={`item_s ${
                    currentPath === "/details" ? "activate" : ""
                  } ${getActiveClass("Details")}`}
                  onClick={(id) => handleItemClick(`/details/${id}`)}
                >
                  Details
                </li>
              </Link> */}
                {/* {showDetailItem && <li
                  className={`item_s ${
                    currentPath === "/details" ? "activate" : ""
                  } ${getActiveClass("Details")}`}
                  onClick={(id) => handleItemClick(`/details/${id}`)}
                >
                  Details
                </li>} */}

              {isSuperAdmin() ? (
                <Link to="/hradmins">
                  <li
                    className={` item_s app-sidebar__heading ${
                      currentPath === "/hradmins" ? "activate" : ""
                    }`}
                    onClick={() => handleItemClick("/hradmins")}
                  >
                    <Icon icon="eos-icons:admin-outlined" style={style} />
                    HR Admin
                  </li>
                </Link>
              ) : null}

              <Link to="/employee">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/employee" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/employee")}
                >
                  <Icon icon="clarity:employee-group-line" style={style} />
                  Employee
                </li>
              </Link>
              <Link to="/attandance">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/attandance" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/attandance")}
                >
                  <Icon icon="simple-line-icons:calender" style={style} />
                  Attendance
                </li>
              </Link>

              {/* <Link to="/managers">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/managers" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/managers")}
                >
                  <Icon icon="majesticons:users-line" style={style} />
                  Managers
                </li>
              </Link> */}
              <Link to="/expanse">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/expanse" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/expanse")}
                >
                  <Icon icon="grommet-icons:money" style={style} />
                  Expense Report
                </li>
              </Link>
              <Link to="/complaint">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/complaint" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/complaint")}
                >
                  <Icon icon="material-symbols:support-agent" style={style} />
                  Complaint
                </li>
              </Link>
              <Link to="/calender">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/calender" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/calender")}
                >
                  <Icon icon="uil:calender" style={style} />
                  Calender View
                </li>
              </Link>
              <Link to="/canteen">
                <li
                  className={` item_s app-sidebar__heading ${
                    currentPath === "/canteen" ? "activate" : ""
                  }`}
                  onClick={() => handleItemClick("/canteen")}
                >
                  <Icon icon="ep:food" style={style} />
                  Canteen facility
                </li>
              </Link>
              {/* Repeat this pattern for other sidebar items */}
              <li
                className=" item_s app-sidebar__heading"
                onClick={handleLogout}
              >
                <Icon icon="tabler:logout" style={style} />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
