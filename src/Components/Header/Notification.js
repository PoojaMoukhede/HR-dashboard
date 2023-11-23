import React, { useState, useEffect } from "react";
import NotificationList from "./NotificationList";
import axios from "axios";
import { useParams } from "react-router-dom";

function NotificationComponent() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mute, setMute] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://192.168.1.211:8080/notifications`)
      .then((response) => {
        const notifications = response.data;
        // console.log(`notifications:`, notifications);
        const unreadNotifications = notifications.filter(
          (notification) => notification.status !== "read"
        );
        setUnreadCount(unreadNotifications.length);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [id]);
  const handleClick = () => {
    setMute(!mute);
    setIsModalOpen(true);
  };

  const notify = () => {
    if (mute) {
      return null;
    }

    setIsAnimating(!mute);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    const countNotifications = setInterval(notify, 2000);

    return () => {
      clearInterval(countNotifications);
    };
  }, []);

  return (
    <>
      <div onClick={handleClick}>
        <div
          className={`notification-bell ${isAnimating ? "is-animating" : ""} ${
            mute ? "is-muted" : ""
          }`}
        >
          <NotificationIcon />
          <span className="count">{unreadCount > 9 ? "9+" : unreadCount}</span>
        </div>
      </div>
      {isModalOpen && (
        <NotificationList
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function NotificationIcon() {
  return (
    <svg width="25" height="30" viewBox="0 0 21 20">
      <g transform="translate(2, 0)">
        <path
          className="notification-bell__bow"
          d="M15,8.5 C15,5.43 12.86,2.86 10,2.18 L10,1.5 C10,0.671572875 9.32842712,0 8.5,0 C7.67157288,0 7,0.671572875 7,1.5 L7,2.18 C4.13,2.86 2,5.43 2,8.5 L2,14 L0,16 L0,17 L17,17 L17,16 L15,14 L15,8.5 Z"
        />
        <path
          className="notification-bell__clapper"
          d="M2.5,2 C2.64,2 2.77,2 2.9,1.96 C3.55,1.82 4.09,1.38 4.34,0.78 C4.44,0.54 4.5,0.27 4.5,0 L0.5,0 C0.5,1.1045695 1.3954305,2 2.5,2 L2.5,2 Z"
        />
      </g>
    </svg>
  );
}

function NotificationContainer() {
  return (
    <div>
      <NotificationComponent />
      {/* <NotificationList count={notificationsData.length} notifications={notificationsData} /> */}
    </div>
  );
}

export default NotificationContainer;
