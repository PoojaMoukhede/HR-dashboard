import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import dummyData from "../../Components/MOCK_DATA.json";
import { Icon } from "@iconify/react";

export default function Managers() {
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
                      Manager contact detail
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
                            <th className="text-center">City</th>
                            <th className="text-center">State</th>
                            <th className="text-center">Action</th>
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
                              <td className="text-center">{row.city}</td>
                              <td className="text-center">{row.state}</td>
                              <td className="d-flex">
                                <button
                                  style={{
                                    color: "white",
                                    backgroundColor: "green",
                                    fontSize: "1rem",
                                    border: "none",
                                    marginRight: "4px",
                                  }}
                                >
                                  <Icon icon="uiw:edit" />
                                </button>
                                <button
                                  style={{
                                    color: "white",
                                    backgroundColor: "red",
                                    fontSize: "1rem",
                                    border: "none",
                                    marginRight: "4px",
                                  }}
                                >
                                  <Icon icon="fluent:delete-20-filled" />
                                </button>
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
