import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AddEmployeeModel from "../../Components/AddEmployeeModel/AddEmployeeModel";
import { ExportToExcel } from "../../Components/Export/ExportToExcel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EditEmployeeModel from '../../Components/AddEmployeeModel/EditEmployeeModel/EditEmployeeModel'




const fileName = "EmployeeData";
export default function Member() {
  const [rows, setRows] = useState([]);
  const [selectedEmployee,setSelectedEmployee] = useState(null)
  // const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
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
      .get( 
        // "http://localhost:8000/employees"
        "https://dashboardbackend-production-9839.up.railway.app/get"
        )
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddMember = (newEmployee) => {
    console.log("model open");
    setRows((prevRows) => [...prevRows, newEmployee]);
    console.log("model close");
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
          .delete(`https://dashboardbackend-production-9839.up.railway.app/deleteEmployee/${id}`)
          // .delete(`http://localhost:8000/employees/${id}`)

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

  const handleImport = async (event) => {
    const selected_file = event.target.files[0];
    if (selected_file) {
      if (selected_file && fileType.includes(selected_file.type)) {
        // Create FormData and append the file
        const formData = new FormData();
        formData.append("file", selected_file);

        axios
          // .post("https://dashboardbackend-production-9839.up.railway.app/importdata", formData)
          .post("https://dashboardbackend-production-9839.up.railway.app/importdata", formData)

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
                  key="tooltip4"
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

                <ExportToExcel apiData={rows} fileName={fileName} />
                <OverlayTrigger
                  key="tooltip5"
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
                    <AddEmployeeModel
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onAdd={handleAddMember}
                    />
                    <EditEmployeeModel
                    selectedEmployee={selectedEmployee}
                      open={isModalOpen}
                      onClose={() => setIsModalOpen(false)}
                      onAdd={handleAddMember}
                    />
                    <div className="table-responsive">
                      <table
                        className="align-middle mb-0 table table-borderless table-striped table-hover"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            {/* <th>ID</th> */}
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
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => (
                            <tr key={row._id}>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left flex2">
                                      <div className="widget-heading">
                                        {row.Emp_name}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              {/* <td className="text-center">{row.empID}</td> */}
                              <td className="text-center">{row.Emp_email}</td>
                              <td className="text-center">
                                {row.Emp_contact_No}
                              </td>
                              <td className="text-center">
                                {row.Emp_department}
                              </td>
                              <td className="text-center">
                                {row.Emp_blood_group}
                              </td>
                              <td className="text-center">
                                {row.Emp_expertise}
                              </td>
                              <td className="text-center">
                                {row.Emp_qualification}
                              </td>
                              <td className="text-center">{row.Emp_city}</td>
                              <td className="text-center">{row.Emp_state}</td>
                              <td className="text-center">{row.Emp_DOB}</td>
                              <td className="text-center">
                                {row.Emp_joining_date}
                              </td>
                              <td className="d-flex">
                                <OverlayTrigger
                                  key="tooltip6"
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="tooltip">
                                      Edit Employee
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    onClick={(e) => {setIsModalOpen(true)
                                    // console.log(e)
                                    // console.log(row)
                                    setSelectedEmployee(row)
                                  }
                                    }
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
                                </OverlayTrigger>
                          
                                <OverlayTrigger
                                  key="tooltip7"
                                  placement="bottom"
                                  overlay={
                                    <Tooltip id="tooltip">
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
