import React, { useEffect, useState } from "react";
import "./header.css";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import profile from "../../Images/pngwing.com (6).png";
import EditHRModel from "../AddEmployeeModel/EditEmployeeModel/EditHRModel";

export default function Profile() {
  const token = localStorage.getItem("token");
  const { Admin: userId } = JSON.parse(atob(token.split(".")[1])); // Assuming your token contains the user's ID as "Admin"

  const [user, setUser] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAddMember = (newEmployee) => {
    console.log("model open");
    setUser((prevRows) => [...prevRows, newEmployee]);
    console.log("model close");
  };

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
                    <div class="top-section">
                      <i class="message fa fa-envelope"></i>
                      <i
                        className="notif fa fa-pencil"
                        onClick={(e) => {
                          console.log("Clicked edit icon");
                          setIsModalOpen(true);
                          setSelectedEmployee(user);
                        }}
                      ></i>

                      {isModalOpen && (
                       <EditHRModel
                       selectedEmployee={selectedEmployee}
                       open={isModalOpen}
                       onClose={() => setIsModalOpen(false)}
                       onAdd={handleAddMember}
                   />
                      )}
                      <div class="pic">
                        <img src={profile} alt="profile pictur" />
                      </div>
                      <div class="name">{user.name}</div>
                      <div class="tag">@Admin</div>
                    </div>
                    <div class="bottom-section">
                      <div class="social-media">
                        <a href="https://www.facebook.com/multispanindia">
                          <i
                            class="fa-brands fa-facebook-f"
                            aria-hidden="true"
                          ></i>
                        </a>
                        <a href="https://twitter.com/multispanindia">
                          <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/multispanindia/">
                          <i class="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/multispancontrolinstruments/?originalSubdomain=in">
                          <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                      </div>
                      <div className="lower-section ">
                        <span>
                          <i class="fa-sharp fa-solid fa-envelope"></i>
                          {user.email}
                        </span>
                        <span>
                          <i class="fa-solid fa-map-location-dot"></i>{" "}
                          {user.admin_city}, {user.admin_state},{" "}
                          {user.admin_country}
                        </span>
                        <span>
                          <i class="fa-solid fa-phone"></i> {user.phone_no}
                        </span>
                      </div>
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
