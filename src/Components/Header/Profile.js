import React, { useEffect,useState } from "react";
import "./header.css";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://192.168.1.211:8080/empdata"
        // "http://localhost:8080/empdata"
        // "https://dashboardbackend-production-9839.up.railway.app/get"
      )
      .then((response) => {
        setUser(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                {/* <ul>
                  {user.map((employee) => {
                    <li>{employee.email}</li>
                    // <li>{employee.name}</li>
                    // <li>{employee.email}</li>

                  })}
                </ul> */}
                        <div className="table-responsive">
          <table className="align-middle mb-0 table table-borderless table-striped table-hover">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th>Name</th>
                <th className="text-center">Email</th>

              </tr>
            </thead>
            <tbody>
              {user.map((row) => (
                <tr>
                  <td className="text-center text-muted">{row.Emp_ID}</td>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          <div className="widget-content-left">
                            <img
                              width="40"
                              className="rounded-circle"
                              src="assets/images/avatars/4.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">{row.name}</div>
                          <div className="widget-subheading opacity-7">
                            {row.Emp_department}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{row.email}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
