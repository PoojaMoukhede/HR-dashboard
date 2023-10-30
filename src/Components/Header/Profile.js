import React, { useEffect, useState } from "react";
import "./header.css";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("token");
  const { Admin: userId } = JSON.parse(atob(token.split(".")[1])); // Assuming your token contains the user's ID as "Admin"

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.211:8080/get/${userId}`)
      .then((response) => {
        const adminData = response.data;

        if (adminData && adminData._id) {
          // const name = adminData.name;
          // const email = adminData.email
          setUser(adminData);
          // setUser(email);
          console.log(`Admin name is ${adminData}`);
        } else {
          console.log("Admin not found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [userId]);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="d-flex justify-content-center align-item-center">
                {user ? (
                  <div class="profile-card">
                    <div class="top-section bg-asteroid">
                      <i class="message fa fa-envelope"></i>
                      <i class="notif fa fa-bell"></i>
                      <div class="pic">
                        <img
                          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxivAs4UknzmDfLBXGMxQkayiZDhR2ftB4jcIV7LEnIEStiUyMygioZnbLXCAND-I_xWQpVp0jv-dv9NVNbuKn4sNpXYtLIJk2-IOdWQNpC2Ldapnljifu0pnQqAWU848Ja4lT9ugQex-nwECEh3a96GXwiRXlnGEE6FFF_tKm66IGe3fzmLaVIoNL/s1600/img_avatar.png"
                          alt="profile pictur"
                        />
                      </div>
                      <div class="name">{user.name}</div>
                      <div class="tag">@Admin</div>
                    </div>
                    <div class="bottom-section">
                      <span>{user.email}</span>
                      <span>{user.admin_city}, {user.admin_state}</span>
                      <span>{user.phone_no}</span>
                    </div>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
