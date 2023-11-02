import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function NotificationList({ open, onClose }) {
  const [showModal1, setshowModal1] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://192.168.1.211:8080/notifications`)
      .then((response) => {
        setLeaveData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [id]);

  return (
    <>
      <Modal show={open} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {leaveData?.map((notification, index) => (
              <li key={index} >
                <span className="d-flex">
                <p>{notification.message}</p>
                <p className="ml-5 text-muted">
                  {new Date(notification.timestamp).toLocaleString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
                </span>
              </li>
            ))}
          </ol>
        </Modal.Body>
      </Modal>
    </>
  );
}
