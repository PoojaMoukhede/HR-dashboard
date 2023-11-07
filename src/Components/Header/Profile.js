import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import profile from "../../Images/pngwing.com (6).png";
import EditHRModel from "../AddEmployeeModel/EditEmployeeModel/EditHRModel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
          setUser(adminData);
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

  const profileImageInput = useRef(null);
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    console.log(`image change function call : ${file}`);
    if (file) {
      const formData = new FormData();
      formData.append("profileImage", file);

      axios
        .put(
          `http://192.168.1.211:8080/update-profile-image/${userId}`,
          formData
        )
        .then((response) => {
          // Handle success
          console.log("Profile image updated successfully");

          const updatedUser = response.data.user;
          console.log(`updated user : ${updatedUser}`);
          setUser(updatedUser);

          setIsModalOpen(false);
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating profile image:", error);
        });
    }
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
                      <OverlayTrigger
                        key="tooltip6"
                        placement="top"
                        overlay={<Tooltip id="tooltip">Update Image</Tooltip>}
                      >
                        <i class="message fa fa-camera">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              opacity: 0,
                            }}
                            ref={profileImageInput}
                          />
                        </i>
                      </OverlayTrigger>

                      <OverlayTrigger
                        key="tooltip7"
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip">Edit Information</Tooltip>
                        }
                      >
                        <i
                          className="notif fa fa-pencil"
                          onClick={(e) => {
                            console.log("Clicked edit icon");
                            setIsModalOpen(true);
                            setSelectedEmployee(user);
                          }}
                        ></i>
                      </OverlayTrigger>

                      {isModalOpen && (
                        <EditHRModel
                          selectedEmployee={selectedEmployee}
                          open={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                          onAdd={handleAddMember}
                        />
                      )}

                      <div className="pic">
                        <img
                          src={
                            user.profileImage
                              ? `data:image/${
                                  user.profileImage.contentType
                                };base64,${btoa(
                                  String.fromCharCode(
                                    ...new Uint8Array(
                                      user.profileImage.data.data
                                    )
                                  )
                                )}`
                              : profile
                          }
                          alt="profile picure"
                        />
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
