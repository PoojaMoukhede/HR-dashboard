// import React, { useState,useEffect } from "react";
// import m_logo from "../../Images/multispan-logo 2.png";
// import { useNavigate } from "react-router-dom";
// import { Icon } from "@iconify/react";
// import Button from "react-bootstrap/Button";
// import axios from "axios";

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [newNotification, setNewNotification] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0); // Initialize count to 0

//   const navigate = useNavigate();
//   function handleLogout() {
//     // e.preventDefault();
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     localStorage.clear();
//     window.location.replace("/login");
//     navigate("/");
//   }
//   function handleToggleSidebar() {
//     console.log("sidebar toggle");
//     setIsSidebarOpen(!isSidebarOpen);
//   }

//   useEffect(() => {
//     // Function to fetch notifications from the server
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get('http://192.168.1.211:8080/notifications');
//         setNotifications(response.data);
//         setNotificationCount(response.data.length); // Update the count based on fetched notifications
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     // Call the fetchNotifications function when the component mounts
//     fetchNotifications();
//   }, []);

//   const addNotification = () => {
//     if (newNotification) {
//       // Function to add a new notification
//       axios.post('http://192.168.1.211:8080/notifications', { message: newNotification })
//         .then((response) => {
//           setNotifications([...notifications, response.data]);
//           setNewNotification('');
//           setNotificationCount(notificationCount + 1); // Increment the count
//         })
//         .catch((error) => {
//           console.error('Error adding notification:', error);
//         });
//     }
//   };

//   const clearNotifications = () => {
//     // Function to clear all notifications
//     axios.delete('http://192.168.1.211:8080/notifications')
//       .then(() => {
//         setNotifications([]);
//         setNotificationCount(0); // Reset the count
//       })
//       .catch((error) => {
//         console.error('Error clearing notifications:', error);
//       });
//   };

//   return (
//     <>
//       <div className="app-header header-shadow">
//         <div className="app-header__logo">
//           <div className="left">
//             {" "}
//             <img alt="" src={m_logo} />
//           </div>

//           <div className="right pt-2">
//       <div className="notifications mt-1">
//         {/* <span className="mt-1 hover_icon">
//           <Icon
//             icon="zondicons:notification"
//             color="#24a1e9"
//             style={{ fontSize: "1.6rem" }}
//           />
//         </span> */}
//         <div class="artboard t-material-light" id="artboard-1"></div>
//         <span className="num">{notificationCount}</span>
//       </div>

//       {notifications.length > 0 && (
//         <ul className="ul_list">
//           {notifications.map((notification, index) => (
//             <li className="icon" key={index}>
//               <span className="icon"></span>
//               <span className="text">{notification.message}</span>
//             </li>
//           ))}
//         </ul>
//       )}

//       <div>
//         <input
//           type="text"
//           placeholder="New Notification"
//           value={newNotification}
//           onChange={(e) => setNewNotification(e.target.value)}
//         />
//         <button onClick={addNotification}>Add Notification</button>
//         <button onClick={clearNotifications}>Clear Notifications</button>
//       </div>

//       <Button
//         style={{ backgroundColor: "#fafbfc", border: "none", color: "black", paddingTop: '0' }}
//         href="/profile"
//       >
//         <Icon
//           icon="healthicons:ui-user-profile"
//           color="#24a1e9"
//           style={{ fontSize: "2rem", marginRight: "0.5rem" }}
//         />
//         {localStorage.getItem("email").split("@")[0]}
//       </Button>
//     </div>
//         </div>
//         <div className="app-header__mobile-menu">
//           <div>
//             <button
//               type="button"
//               onClick={() => handleToggleSidebar()}
//               className="hamburger hamburger--elastic mobile-toggle-nav"
//             >
//               <span className="hamburger-box">
//                 <span className="hamburger-inner"></span>
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="app-header__menu">
//           <span>
//             <button
//               type="button"
//               className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav "
//               onClick={() => handleLogout()}
//             >
//               <span className="btn-icon-wrapper">Logout</span>
//             </button>
//           </span>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import m_logo from "../../Images/multispan-logo 2.png";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Notification from "./Notification"; // Import the Notification component
// import NotificationList from "./NotificationList";

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

          <div className="right pt-2">
            <div className="notifications mt-1">
              {/* Include the Notification component here */}
              <Notification
                count={notificationCount}
                notifications={notifications}
                addNotification={addNotification}
                clearNotifications={clearNotifications}
                newNotification={newNotification}
                setNewNotification={setNewNotification}
               
              />
              {/* {isModalOpen && (
              <NotificationList
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            )} */}
              {/* <span className="num">{notificationCount}</span> */}
            </div>
            

            {/* {notifications.length > 0 && (
              <ul className="ul_list">
                {notifications.map((notification, index) => (
                  <li className="icon" key={index}>
                    <span className="icon"></span>
                    <span className="text">{notification.message}</span>
                  </li>
                ))}
              </ul>
            )} */}

            {/* <div>
              <input
                type="text"
                placeholder="New Notification"
                value={newNotification}
                onChange={(e) => setNewNotification(e.target.value)}
              />
              <button onClick={addNotification}>Add Notification</button>
              <button onClick={clearNotifications}>Clear Notifications</button>
            </div> */}

            <Button
              style={{
                backgroundColor: "#fafbfc",
                border: "none",
                color: "black",
                paddingTop: "0",
              }}
              href="/profile"
            >
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
