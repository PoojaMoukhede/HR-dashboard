import React, { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import axios from "axios";
import AddHr from "./Components/AddEmployeeModel/AddHrModal/AddHr";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Icon } from "@iconify/react";
import swal from "sweetalert";

export default function HRadmins() {
  const [rows, setRows] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/getAdmin")
      .then((response) => {
        setRows(response.data);
        console.log(response.data);
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

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    console.log("kkkkkkkkkkk");
  };

  const handleDeleteEmployee = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // User confirmed deletion, proceed with the delete request
        console.log(`id in delete ${id}`);
        axios
          // .delete(`https://dashboardbackend-production-9839.up.railway.app/deleteEmployee/${id}`)
          .delete(`http://192.168.1.211:8080/admin/${id}`)

          .then((res) => {
            const updatedRows = rows.filter((row) => row._id !== id);
            setRows(updatedRows);
            swal({
              title: "Deleted!",
              text: "Employee data has been deleted.",
              icon: "success",
              timer: 2000,
              button: false,
            });
            console.log(`id in delete ${res}`);
          });
      } else {
        // User clicked "Cancel" or closed the dialog, do nothing
        swal("Cancelled", "Employee data is safe 😊", "info");
      }
    });
  };

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <AddHr openModal={openRegisterModal} />
              <div className="row">
                <div className="col-md-12">
                  <div className="main-card mb-3 card">
                    <div className="card-header">
                      HR Admin Data
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
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th className="text-center">Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => (
                            <tr key={row._id}>
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
                              <td>
                                {row.email === "superadmin@yopmail.com" ? (
                                  // If the email matches superadmin, show a message or a disabled button
                                <OverlayTrigger
                                key={`tooltip-${row._id}`}
                                placement="bottom"
                                overlay={
                                  <Tooltip id={`tooltip-${row._id}`}>
                                    No one can delete super admin
                                  </Tooltip>
                                }
                              >
                                <button
                                  style={{
                                    color: "white",
                                    backgroundColor: "#f7da02",
                                    fontSize: "1.2rem",
                                    border: "none",
                                    marginRight: "4px",
                                  }}
                                >
                                  <Icon icon="ion:warning" color="white" />
                                </button>
                              </OverlayTrigger>
                                ) : (
                                  // If the email doesn't match superadmin, show the delete button
                                  <OverlayTrigger
                                    key={`tooltip-${row._id}`}
                                    placement="bottom"
                                    overlay={
                                      <Tooltip id={`tooltip-${row._id}`}>
                                        Delete Employee
                                      </Tooltip>
                                    }
                                  >
                                    <button
                                      onClick={() =>
                                        handleDeleteEmployee(row._id)
                                      }
                                      style={{
                                        color: "white",
                                        backgroundColor: "red",
                                        fontSize: "1.2rem",
                                        border: "none",
                                        marginRight: "4px",
                                      }}
                                    >
                                      <Icon icon="fluent:delete-20-filled" />
                                    </button>
                                  </OverlayTrigger>
                                )}
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
      <AddHr openModal={openRegisterModal} />
    </>
  );
}
