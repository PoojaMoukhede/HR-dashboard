import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table() {
  const [rows, setRows] = useState([]);
  const [attandance, setAttandance] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [timer,setTimer] =([])
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/Users")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    axios
      .get("http://192.168.1.211:8080/departmentWise")
      .then((response) => {
        setAttandance(response.data[0].Employee_attandance);
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
    if (status === "On-site") {
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
          <i className="header-icon lnr lnr-users icon-gradient bg-asteroid">
            {" "}
          </i>
          Active Users
          <div className="btn-actions-pane-right">
            <div className="search-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search..."
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="table-responsive"
          style={{ height: "440px", overflowY: "scroll" }}
        >
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
              {attandance &&
                filteredRows.map((row) => (
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
                            <div className="widget-heading">{row.Emp_name}</div>
                            <div className="widget-subheading opacity-7">
                              {row.Emp_department}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center"> {timer}</td>
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
                        className="btn btnprimary btn-sm"
                        onClick={(e) => {
                          // console.log({ row });
                          navigate(`/details/${row?._id}`);
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
      </div>
    </>
  );
}
