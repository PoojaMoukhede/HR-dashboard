import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import AttandanceDepartmentWise from "../Components/Table/AttandanceDepartmentWise";
import axios from "axios";

export default function Attandance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendanceResponse = await axios.get(
          "http://192.168.1.211:8080/departmentWise"
        );
        setAttendanceData(attendanceResponse.data);

        const userResponse = await axios.get("http://192.168.1.211:8080/Users");
        setUserData(userResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    let presentCount = 0;

    attendanceData.forEach((attendance) => {
      const user = userData.find((user) => user._id === attendance.userRef._id);

      if (user) {
        const status = attendance.Employee_attandance[0]?.action;
        const D_ate = new Date(attendance.Employee_attandance[0]?.timestamp);
        const attendanceDate = D_ate.toISOString().split("T")[0];

        if (attendanceDate === today) {
          if (status === "Punch In") {
            presentCount += 1;
          } 
        }
      }
    });

    setTotalEmployees(userData.length);
    setTotalPresent(presentCount);
  }, [attendanceData, userData]);

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <AttandanceDepartmentWise />

            <div className="row">
              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-4 widget-content">
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Total Employees</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>{totalEmployees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-4 widget-content">
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Present Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>{totalPresent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-4 widget-content">
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Absent Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>{totalEmployees-totalPresent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="mb-3 card cardp">
                  <div className="main-card mb-2">
                    <div className="card-header">
                      <i className="header-icon lnr lnr-paperclip icon-gradient bg-asteroid">
                        {" "}
                      </i>
                      Leave Applied
                    </div>
                  </div>
                  {/* <p>Functionality coming soon....</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
