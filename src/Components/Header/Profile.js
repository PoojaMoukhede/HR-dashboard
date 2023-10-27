import React, { useEffect, useState } from "react";
import "./header.css";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  console.log(`id : ${id}`);
  // const [user, setUser] = useState([]);
  // useEffect((id) => {
  //   axios
  //     .get(`http://192.168.1.211:8080/get/${id}`)
  //     .then((response) => {
  //       setUser(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="d-flex justify-content-center align-item-center">
                {/* {user?.map((data)=>{ */}
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
                    <div class="name">Your Name</div>
                    <div class="tag">@Admin Email</div>
                  </div>
                  <div class="bottom-section">
                    <span>Contact Number</span>
                    <span>Address</span>
                    <span>Contact Number</span>
                  </div>
                </div>
                {/* })} */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
