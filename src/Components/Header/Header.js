import React, { useState, useEffect } from "react";
import m_logo from "../../Images/multispan-logo 2.png";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Notification from "./Notification"; 
import user from '../../Images/pngwing.com (6).png'
import DarkMode from "../../DarkMode";


export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [notificationCount, setNotificationCount] = useState(0); 
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/login");
    navigate("/");
  }

  function handleToggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
      axios.get(
          "http://192.168.1.211:8080/notifications"
        )
        .then((response) => {
          setNotifications(response.data);
          setNotificationCount(response.data.length);
        })
      
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const addNotification = () => {
    if (newNotification) {
      axios
        .post("http://192.168.1.211:8080/notifications", {
          message: newNotification,
        })
        .then((response) => {
          setNotifications([...notifications, response.data]);
          setNewNotification("");
          setNotificationCount(notificationCount + 1);
        })
        .catch((error) => {
          console.error("Error adding notification:", error);
        });
    }
  };

  const clearNotifications = () => {
    axios
      .delete("http://192.168.1.211:8080/notifications")
      .then(() => {
        setNotifications([]);
        setNotificationCount(0);
      })
      .catch((error) => {
        console.error("Error clearing notifications:", error);
      });
  };

  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="left">
            <img alt="" src={m_logo} />
          </div>
          <DarkMode/>
          <div className="right pt-2">
            <div className="notifications mt-1">
              <Notification
                count={notificationCount}
                notifications={notifications}
                addNotification={addNotification}
                clearNotifications={clearNotifications}
                newNotification={newNotification}
                setNewNotification={setNewNotification}               
              />            
            </div>
            <Button
              style={{
                backgroundColor: "#fafbfc",
                // backgroundColor:"#191a1a",
                border: "none",
                color: "black",
                // color: "white",
                paddingTop: "0",
              }}
              href="/profile"
            >
              {/* <img src={user} alt="" style={{width:'2rem'}}/> */}
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
