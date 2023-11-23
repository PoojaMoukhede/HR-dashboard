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

  const uniqueDepartments = Array.from(
    new Set(userData.map((user) => user.Emp_department))
  );

  const initialCounts = uniqueDepartments.map((department) => ({
    department,
    totalMembers: 0,
    presentCount: 0,
    absentCount: 0,
  }));

  useEffect(() => {
    // Update departmentCounts with fetched data
    const updatedCounts = [...initialCounts];
    const presentEmployeeList = [];

    userData.forEach((user) => {
      const department = user.Emp_department;
      const departmentIndex = updatedCounts.findIndex(
        (item) => item.department === department
      );

      if (departmentIndex !== -1) {
        updatedCounts[departmentIndex].totalMembers += 1;
      }
    });

    const today = new Date().toISOString().split("T")[0];

    attendanceData.forEach((attendance) => {
      const department = attendance.userRef.Emp_department;
      const user = userData.find((user) => user._id === attendance.userRef._id);

      if (user) {
        const status = attendance.Employee_attandance[0]?.action;
        const D_ate = new Date(attendance.Employee_attandance[0]?.timestamp);
        const attendanceDate = D_ate.toISOString().split("T")[0];

        if (attendanceDate === today) {
          const departmentIndex = updatedCounts.findIndex(
            (item) => item.department === department
          );
          if (status === "Punch In") {
            updatedCounts[departmentIndex].presentCount += 1;
            presentEmployeeList.push(user); // Add the present employee to the list
          } else {
            updatedCounts[departmentIndex].absentCount += 1;
          }
        }
      }
    });

    setDepartmentCounts(updatedCounts);
    setPresentEmployees(presentEmployeeList);
    console.log(`list :${presentEmployeeList}`);
  }, [attendanceData, userData]);
  return (
    <div>
      {/* <ul>   // for checking only
              {presentEmployees.map((employee) => (
                <li key={employee._id}>{employee.Emp_name}</li>
              ))}
            </ul> */}
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
                            <th className="text-center">Total</th>
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
