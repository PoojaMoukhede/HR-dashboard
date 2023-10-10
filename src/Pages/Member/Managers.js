import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
// import dummyData from "../../Components/MOCK_DATA.json";
import { Icon } from "@iconify/react";
import { ExportToExcel } from "../../Components/Export/ExportToExcel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";
import swal from "sweetalert";
import AddManagers from "../../Components/AddEmployeeModel/AddManagers";

const fileName = "Managers-Contact";

export default function Managers() {
  const [searchValue, setSearchValue] = useState("");
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  useEffect(() => {
    axios
      // .get("http://localhost:8080/getmanager")
      .get("http://localhost:8080/manager")

      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleImport = async (event) => {
    const selected_file = event.target.files[0];
    if (selected_file) {
      if (selected_file && fileType.includes(selected_file.type)) {
        // Create FormData and append the file
        const formData = new FormData();
        formData.append("file", selected_file);

        axios
          .post(
            // "http://localhost:8080/importmanager",
            "http://localhost:8080/importmanager",
            formData
          )
          .then((response) => {
            console.log("Import response:", response);
          })
          .catch((error) => {
            console.error("Error sending POST request:", error);
          });
      } else {
        console.log("Please Upload Excel file only");
      }
      console.log("Selected file type:", selected_file.type);
    }
    window.location.reload();
  };
  const handleAdd = (newEmployee) => {
    console.log("model open");
    setRows((prevRows) => [...prevRows, newEmployee]);
    console.log("model close");
  };

  const handleDelete = (id) => {
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
          .delete(
            // `http://localhost:8080/delete/${id}`
            `http://localhost:8080/manager/${id}`
          )
          .then((res) => {
            const updatedRows = rows.filter((row) => row._id !== id);
            setRows(updatedRows);
            swal({
              title: "Deleted!",
              text: "Manager's data has been deleted.",
              icon: "success",
              timer: 2000,
              button: false,
            });
            console.log(`id in delete ${res}`);
          });
      } else {
        // User clicked "Cancel" or closed the dialog, do nothing
        swal("Cancelled", "Manager's data is safe 😊", "info");
      }
    });
  };
  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelection = (email) => {
    if (selectedRows.includes(email)) {
      setSelectedRows(selectedRows.filter((id) => id !== email));
    } else {
      setSelectedRows([...selectedRows, email]);
    }
    const newData = rows.map((row) => {
      if (row.email === email) {
        return { ...row, email };
      }
      return row;
    });
    setRows(newData);
  };
  const handleDeleteRows = () => {
    console.log("delete All requested");
    axios.delete("http://localhost:8080/manager").then((res) => {
      const newData = rows.filter((row) => !selectedRows.includes(row.email));
      setRows(newData);

      // setSelectedRows([]);
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
              <div className="d-flex">
                <OverlayTrigger
                  key="tooltip"
                  placement="top"
                  overlay={<Tooltip id="tooltip">Delete All</Tooltip>}
                >
                  <button
                    className="btn btn-primary mb-2 mr-2"
                    name="allselect"
                    // onClick={handleDeleteRows}
                    style={{ borderRadius: "30px", padding: "10px" }}
                  >
                    <Icon
                      icon="fluent:delete-16-regular"
                      color="white"
                      width="1.5rem"
                    />
                  </button>
                </OverlayTrigger>
                <OverlayTrigger
                  key="tooltip"
                  placement="top"
                  overlay={<Tooltip id="tooltip">Add Employee</Tooltip>}
                >
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary mb-2 "
                    style={{ borderRadius: "30px", padding: "10px" }}
                  >
                    {/* Add Employee */}
                    <Icon
                      icon="mingcute:add-fill"
                      color="white"
                      width="1.5rem"
                    />
                  </button>
                </OverlayTrigger>
                <AddManagers
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onAdd={handleAdd}
                />

                <ExportToExcel apiData={rows} fileName={fileName} />
                <OverlayTrigger
                  key="tooltip1"
                  placement="top"
                  overlay={<Tooltip id="tooltip">Import Data</Tooltip>}
                >
                  <div
                    className="fileUpload"
                    style={{ borderRadius: "30px", padding: "10px" }}
                  >
                    <input
                      type="file"
                      className="upload"
                      onChange={handleImport}
                    />
                    <Icon icon="pajamas:import" color="white" width="1.5rem" />
                    {/* <span>Import</span> */}
                  </div>
                </OverlayTrigger>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="main-card mb-3 card">
                    <div className="card-header">
                      <i className="header-icon lnr lnr-users icon-gradient bg-asteroid">
                        {" "}
                      </i>
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
                    <div
                      className="table-responsive"
                      style={{height:"80vh"}}
                    >
                      <table
                        className="align-middle mb-0 table table-borderless table-striped table-hover"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <thead>
                          <tr>
                            <th className="select-header">
                              {/* <p>Select</p> */}
                              <input
                                type="checkbox"
                                style={{ height: "1rem", width: "2rem" }}
                              />
                            </th>
                            <th>Name</th>
                            {/* <th>ID</th> */}
                            <th className="text-center">Email</th>
                            <th className="text-center">Contact Number</th>
                            <th className="text-center">Department</th>
                            <th className="text-center">Blood Group</th>
                            <th className="text-center">City</th>
                            <th className="text-center">State</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => (
                            <tr key={row.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  style={{ height: "1rem", width: "2rem" }}
                                  checked={selectedRows.includes(row.email)}
                                  onChange={() => handleRowSelection(row.email)}
                                  // onClick={()=>handleChange()}
                                />
                              </td>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left flex2">
                                      <div className="widget-heading">
                                        {row.name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              {/* <td className="text-center">{row.mID}</td> */}

                              <td className="text-center">{row.email}</td>
                              <td className="text-center">{row.contact_no}</td>
                              <td className="text-center">{row.department}</td>
                              {/*  please  change it for mongodb its contact_no */}
                              <td className="text-center">
                                {row.blood_group}
                                {/* SQL has no field */}
                              </td>
                              <td className="text-center">{row.city}</td>
                              <td className="text-center">{row.state}</td>
                              <td className="d-flex justify-content-center ">
                                {/* <OverlayTrigger
                                  key="tooltip2"
                                  placement="bottom"
                                  overlay={<Tooltip id="tooltip">Edit</Tooltip>}
                                >
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
                                </OverlayTrigger> */}

                                <OverlayTrigger
                                  key="tooltip3"
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="tooltip">Delete</Tooltip>
                                  }
                                >
                                  <button
                                    onClick={() => handleDelete(row._id)}
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
                                </OverlayTrigger>
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
