import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import dummyData from "../../Components/MOCK_DATA.json";

export default function Member() {
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState([]);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  useEffect(() => {
    setRows(dummyData);
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
                <div className="col-md-12">
                  <div className="main-card mb-3 card">
                    <div className="card-header">
                      Employee Data
                      <div className="btn-actions-pane-right">
                        <div className="search-wrapper">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Type to search"
                            onChange={(event) =>
                              setSearchValue(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table
                        className="align-middle mb-0 table table-borderless table-striped table-hover"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <thead>
                          <tr>
                            <th className="text-center">ID</th>
                            <th>Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Contact Number</th>
                            <th className="text-center">Department</th>
                            <th className="text-center">Blood group</th>
                            <th className="text-center">Expertise</th>
                            <th className="text-center">Qualification</th>
                            <th className="text-center">City</th>
                            <th className="text-center">State</th>
                            <th className="text-center">Date Of Birth</th>
                            <th className="text-center">Joining Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => (
                            <tr>
                              <td className="text-center text-muted">
                                {row.id}
                              </td>
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
                                      <div className="widget-heading">
                                        {row.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">{row.email}</td>
                              <td className="text-center">{row.contact_no}</td>
                              <td className="text-center">{row.department}</td>
                              <td className="text-center">O+</td>
                              <td className="text-center">
                                Mechanical Engineer
                              </td>
                              <td className="text-center">Enginnering</td>
                              <td className="text-center">{row.city}</td>
                              <td className="text-center">{row.state}</td>
                              <td className="text-center">{row.DOB}</td>
                              <td className="text-center">
                                {row.joining_date}
                              </td>
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
        </div>
      </div>
    </>
  );
}
