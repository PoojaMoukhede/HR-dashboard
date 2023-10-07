import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Table() {
  const [rows, setRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // setRows(dummyData);
    axios
    .get( 
      "http://localhost:8080/Users")
    .then((response) => {
      setRows(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const makeStyle = (status) => {
    if (status === "Pending") {
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    } else if (status === "In-office") {
      return {
        background: "#ffadad8f",
        color: "red",
      };
    } else {
      return {
        background: "#59bfff",
        color: "white",
      };
    }
  };

  return (
    <>
      <div className="main-card mb-3 card">
        <div className="card-header">
          Active Users
          <div className="btn-actions-pane-right">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="table-responsive" style={{ height: "440px", overflowY: "scroll" }}>
          <table className="align-middle mb-0 table table-borderless table-striped table-hover">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th>Name</th>
                <th className="text-center">Hours</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr>
                  <td className="text-center text-muted">{row.Emp_id}</td>
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
                          <div className="widget-heading">{row.Emp_name}</div>
                          <div className="widget-subheading opacity-7">
                            {row.Emp_department}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{row.hours}</td>
                  <td className="text-center">
                    <div
                      className="badge badge-warning"
                      style={makeStyle(row.status)}
                    >
                      {row.status}
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      id="PopoverCustomT-1"
                      className="btn btn-primary btn-sm"
                      onClick={(e)=>{
                        console.log({row})
                        navigate(`/details/${row?._id}`)
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="d-block text-center card-footer">
          <button className="mr-2 btn-icon btn-icon-only btn btn-outline-danger">
            <i className="pe-7s-trash btn-icon-wrapper"> </i>
          </button>
          <button className="btn-wide btn btn-success">Save</button>
        </div> */}
      </div>
    </>
  );
}
