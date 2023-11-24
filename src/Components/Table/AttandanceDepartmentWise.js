import React, { useState, useEffect } from "react";
import PolorChart from "../PolorChart";
import axios from "axios";

export default function AttandancedepartmentWise() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [departmentCounts, setDepartmentCounts] = useState([]);
  const [presentEmployees, setPresentEmployees] = useState([]);
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


  useEffect(() => {
    // Create an object to store users by department
    const usersByDepartment = {};

    // Map attendanceData to users
    const presentUsers = attendanceData.map((attendance) => {
      const user = userData.find((user) => user._id === attendance.userRef._id);
      return user;
    });

    // Group users by department
    presentUsers.forEach((user) => {
      if (user) {
        const department = user.Emp_department;

        if (!usersByDepartment[department]) {
          usersByDepartment[department] = [];
        }

        usersByDepartment[department].push(user);
      }
    });

    setPresentEmployees(usersByDepartment);

    // Calculate total members department-wise
    const totalMembersByDepartment = {};

    userData.forEach((user) => {
      const department = user.Emp_department;

      if (!totalMembersByDepartment[department]) {
        totalMembersByDepartment[department] = 0;
      }

      totalMembersByDepartment[department] += 1;
    });

    setDepartmentCounts(
      Object.keys(totalMembersByDepartment).map((department) => ({
        department,
        totalMembers: totalMembersByDepartment[department],
        presentCount: usersByDepartment[department]?.length || 0,
      }))
    );
  }, [attendanceData, userData]);

  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-rocket icon-gradient bg-asteroid">
                  {" "}
                </i>
                Daily Attandance Report Table
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="tab-eg-55">
                <div className="widget-chart p-3">
                  <div style={{ height: "370px" }}>
                    <div
                      className="table-responsive"
                      style={{ height: "370px" }}
                    >
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Department</th>
                            <th className="text-center">Total Members</th>
                            <th className="text-center">Present</th>
                            <th className="text-center">Absent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {departmentCounts.length > 0 &&
                            departmentCounts.map(
                              ({ department, presentCount, totalMembers }) => (
                                <tr key={department}>
                                  <td>
                                    <div className="widget-content p-0">
                                      <div className="widget-content-wrapper">
                                        <div className="widget-content-left flex2">
                                          <div className="widget-heading">
                                            {department}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center text-muted">
                                    {totalMembers}
                                  </td>
                                  <td className="text-center text-muted">
                                    {presentCount}
                                  </td>
                                  <td className="text-center text-muted">
                                    {totalMembers - presentCount}
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-4">
          <div className="mb-3 card">
            <div className="card-header-tab card-header-tab-animation card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-pie-chart icon-gradient bg-asteroid">
                  {" "}
                </i>
                Daily Attandance Report
              </div>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tabs-eg-77">
                  <div
                    className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                    style={{ height: "370px" }}
                  >
                    {!loading && departmentCounts.length > 0 ? (
                      <PolorChart
                        series={departmentCounts.map(
                          (data) => data.presentCount
                        )}
                        labels={departmentCounts.map((data) => data.department)}
                      />
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
