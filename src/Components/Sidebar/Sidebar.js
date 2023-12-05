import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './Sidebar.css'

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
      >
        <div className="scrollbar-sidebar">
        <nav class="main-menu">
          <ul>
            {/* <Link to='/dashboard'></Link> */}
            <li>
              <a href="/dashboard">
                <i class="fa fa-home fa-2x"></i>
                <span class="nav-text">Community Dashboard</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="#">
                <i class="fa fa-globe fa-2x"></i>
                <span class="nav-text">Global Surveyors</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="#">
                <i class="fa fa-comments fa-2x"></i>
                <span class="nav-text">Group Hub Forums</span>
              </a>
            </li>
            <li class="has-subnav">
              <a href="#">
                <i class="fa fa-camera-retro fa-2x"></i>
                <span class="nav-text">Survey Photos</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-film fa-2x"></i>
                <span class="nav-text">Surveying Tutorials</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-book fa-2x"></i>
                <span class="nav-text">Surveying Jobs</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-cogs fa-2x"></i>
                <span class="nav-text">Tools & Resources</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-map-marker fa-2x"></i>
                <span class="nav-text">Member Map</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-info fa-2x"></i>
                <span class="nav-text">Documentation</span>
              </a>
            </li>
          </ul>

          <ul class="logout">
            <li onClick={handleLogout}> 
              <a href="#">
                <i class="fa fa-power-off fa-2x"></i>
                <span class="nav-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
        </div>
      </div>
    </>
  );
}
