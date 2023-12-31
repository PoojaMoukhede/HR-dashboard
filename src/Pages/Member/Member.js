import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { Icon } from "@iconify/react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import AddEmployeeModel from "../../Components/AddEmployeeModel/AddEmployeeModel";
import { ExportToExcel } from "../../Components/Export/ExportToExcel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import EditEmployeeModel from "../../Components/AddEmployeeModel/EditEmployeeModel/EditEmployeeModel";

const fileName = "EmployeeData";
export default function Member() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


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
        "http://192.168.1.211:8080/Users"
      )
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddMember = (newEmployee) => {
    setRows((prevRows) => [...prevRows, newEmployee]);
  };
  const handleAddMember2 = (newEmployee) => {
    setRows((prevRows) => [...prevRows, newEmployee]);
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
        // console.log(`id in delete ${id}`);
        axios
          .delete(`http://192.168.1.211:8080/Users/${id}`)

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
            // console.log(`id in delete ${res}`);
          });
      } else {
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
          .post("http://192.168.1.211:8080/importdata", formData)
 
          .then((response) => {
            // console.log("Import response:", response);
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
    // console.log("Delete All requested");
    axios
      .delete("http://192.168.1.211:8080/Users", {
        data: selectedRows, // Send the array of email addresses directly
      })
      .then((res) => {
        const newData = rows.filter((row) => !selectedRows.includes(row.email));
        setRows(newData);
        setSelectedRows([]);
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };
  const handleSelectAll = () => {
    const allEmails = filteredRows.map((row) => row.email);
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allEmails);
    }
    setSelectAll(!selectAll);
  };

 

  return (
    <>
      <div className="app-container  body-tabs-shadow fixed-sidebar fixed-header">
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
                    onClick={handleDeleteRows}
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
                  key="tooltip4"
                  placement="top"
                  overlay={<Tooltip id="tooltip">Add Employee</Tooltip>}
                >
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary mb-2 "
                    style={{ borderRadius: "30px", padding: "10px" }}
                  >
  
                    <Icon
                      icon="mingcute:add-fill"
                      color="white"
                      width="1.5rem"
                    />
                  </button>
                </OverlayTrigger>

                <ExportToExcel apiData={rows} fileName={fileName} />
                {/* <OverlayTrigger
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
                      // onChange={handleImport}
                    />
                    <Icon icon="pajamas:import" color="white" width="1.5rem" />
                  </div>
                </OverlayTrigger> */}

              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="main-card mb-3 card">
                    <div className="card-header">
                      <i className="header-icon lnr lnr-users icon-gradient bg-asteroid">
                        {" "}
                      </i>
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

                    <div
                      className="table-responsive"
                      style={{ height: "80vh" }}
                    >
                      <table
                        className="align-middle mb-0 table table-borderless table-striped table-hover"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <thead>
                          <tr>
                          <th className="select-header">
                              <input
                                type="checkbox"
                                style={{ height: "1rem", width: "2rem" }}
                                checked={selectAll}
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Contact Number</th>
                            <th className="text-center">Department</th>
                            <th className="text-center">Blood group</th>
                            <th className="text-center">Expertise</th>
                            <th className="text-center">Qualification</th>
                            <th className="text-center">City</th>
                            <th className="text-center">State</th>
                            <th className="text-center">Country</th>
                            <th className="text-center">Designation</th>
                            <th className="text-center">Date Of Birth</th>
                            <th className="text-center">Joining Date</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => (
                            <tr key={row._id} style={{fontSize:"0.85rem"}}>
                              <td>
                                <input
                                  type="checkbox"
                                  style={{ height: "1rem", width: "2rem" }}
                                  checked={selectedRows.includes(row.email)}
                                  onChange={() => handleRowSelection(row.email)}
                                />
                              </td>
                              <td className="text-center">{row.Emp_ID}</td>
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

                              <td className="text-center">{row.email}</td>
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
                              <td className="text-center">{row.Emp_country}</td>
                              <td className="text-center">{row.Emp_designation}</td>
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
                                    onClick={(e) => {
                                      setIsModalOpen2(true);
                                     
                                      setSelectedEmployee(row);
                                    }}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditEmployeeModel
        selectedEmployee={selectedEmployee}
        open={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        onAdd={handleAddMember2}
      />
      {/* <Register openModal={openRegisterModal} /> */}
    </>
  );
}
