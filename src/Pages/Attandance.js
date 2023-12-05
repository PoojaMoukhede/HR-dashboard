import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import AttandanceDepartmentWise from "../Components/Table/AttandanceDepartmentWise";
import axios from "axios";

export default function Attandance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <div className="app-container  body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <AttandanceDepartmentWise />

            <div className="row">
              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-4 widget-content" style={{backgroundColor:'#55bfe9',color:'white'}}>
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Total Employees</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>{userData.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-4 widget-content" style={{backgroundColor:'#55bfe9',color:'white'}}>
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Present Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>{attendanceData.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-4 widget-content" style={{backgroundColor:'#55bfe9',color:'white'}}>
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Absent Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>{(userData.length)-(attendanceData.length)}</span>
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
                  <p>Functionality coming soon....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
