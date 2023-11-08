import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function NotificationList({ open, onClose }) {
  const [leaveData, setLeaveData] = useState([]);
  const [readNotifications, setReadNotifications] = useState(new Set());

  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/notifications")
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });

    // Load read notification IDs from local storage
    const storedReadNotifications = localStorage.getItem("readNotifications");
    if (storedReadNotifications) {
      setReadNotifications(new Set(JSON.parse(storedReadNotifications)));
    }
  }, []);

  const markAsRead = (id) => {
    axios
      .put(`http://192.168.1.211:8080/notifications/${id}`, {
        status: "read",
      })
      .then(() => {
        setReadNotifications((prevReadNotifications) => {
          const updatedReadNotifications = new Set(prevReadNotifications);
          updatedReadNotifications.add(id);
          return updatedReadNotifications;
        });
      })
      .catch((error) => {
        console.error("Error marking notification as read:", error);
      });
  };

  const clearNotifications = () => {
    axios
      .delete("http://192.168.1.211:8080/notifications")
      .then(() => {
        setLeaveData([]);
        localStorage.removeItem("readNotifications");
      })
      .catch((error) => {
        console.error("Error clearing notifications:", error);
      });
  };

  const calculateTimeDifference = (timestamp) => {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifference = currentTime - notificationTime;

    if (timeDifference < 3600000) {
      return `${Math.floor(timeDifference / 60000)} min ago`;
    } else if (timeDifference < 86400000) {
      return `${Math.floor(timeDifference / 3600000)} hours ago`;
    } else {
      return `${Math.floor(timeDifference / 86400000)} days ago`;
    }
  };
  useEffect(() => {
    // Save read notification IDs to local storage whenever the set changes
    localStorage.setItem("readNotifications", JSON.stringify(Array.from(readNotifications)));
  }, [readNotifications]);

  return (
    <>
      <Modal show={open} onHide={onClose} >
        <Modal.Header closeButton 
        // style={{backgroundColor:"#414141", color:"white"}}
        >
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body 
        // style={{backgroundColor:"#414141", color:"white"}}
        >
          <ul>
            {leaveData?.map((notification) => (
              <li key={notification._id} style={{ listStyle: "none" }}>
                <span className="d-flex">
                  {notification.status === "pending" ? (
                    <Icon
                      icon="zondicons:close-solid"
                      color="green"
                      style={{ width: "1rem", marginLeft: "-30px" }}
                    />
                  ) : (
                    <Icon
                      icon="dashicons:yes-alt"
                      color="green"
                      style={{ width: "1rem", marginLeft: "-30px" }}
                    />
                  )}
                  <p style={{ width: "80%", marginLeft: "8px"}}>
                    {notification.message}
                  </p>
                  <p className="text-muted">
                    {calculateTimeDifference(notification.timestamp)}
                  </p>
                </span>
                {notification.status === "pending" && (
                  <Button
                    variant="link"
                    style={{ color: "#00e396", textDecoration: "none" }}
                    onClick={() => markAsRead(notification._id)}
                  >
                    Mark as read
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer className="m-0 p-0"
        //  style={{backgroundColor:"#414141", color:"white"}}
         >
          <Button
            variant="link"
            style={{ color: "#feb019", textDecoration: "none" }}
            onClick={clearNotifications}
          >
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
