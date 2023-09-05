import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import AddEmployeeModel from "../../Components/AddEmployeeModel/AddEmployeeModel";
import { ExportToExcel } from "../../Components/Export/ExportToExcel";
import { read, readFile, utils } from "xlsx";
import * as XLSX from 'xlsx';

const fileName="EmployeeData"
export default function Member() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [excelData , setExcelData] = useState([])
  const fileType =['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel']

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  useEffect(() => {
    axios
      .get("http://localhost:8080/get")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  const handleAddMember = (newEmployee) => {
    console.log("model open")
    setRows((prevRows) => [...prevRows, newEmployee]);
    console.log("model close")
  };

  const handleDeleteEmployee = (id) => {
    console.log(`id in delete ${id}`)
        axios.delete(`http://localhost:8080/deleteEmployee/${id}`)
          .then(res => {
            const updatedRows = rows.filter((row) => row._id !== id);
            setRows(updatedRows);
            swal({
              title: "Done!",
              text: "User is deleted",
              icon: "success",
              timer: 2000,
              button: false
            });
            console.log(`id in delete ${res}`)
          })
      }

      // const handleImport = async (event) => {
      //   console.log("inside import")
      
      //   try {
      //     const files = event.target.files[0];
      //     const file = files;
      //     console.log("inside import try",file)
      //     const reader = new FileReader();
      //     reader.onload = async (event) => {
      //       const wb = read(event.target.result);
      //       const sheets = wb.SheetNames;
      //       console.log(`sheets : ${sheets}`)
      //       if (sheets.length) {
      //         const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
      //         console.log(`Sheet length : ${sheets.length}`)
      //         // Send data to the backend API endpoint
      //         const response = await fetch('http://localhost:8080/importdata', {
      //           method: 'POST',
      //           headers: {
      //             'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      //           },               
      //           body: JSON.stringify(rows),
      //         });
      //         console.log(`Response : ${response}`)
      //         if (response.ok) {
      //           console.log('Data imported successfully');
      //         }
      //       }
      //     };
      //     reader.readAsArrayBuffer(file);
      //   } catch (error) {
      //     console.log('Error: ', error);
      //   }
      // };
    
const handleImport = async(event)=>{
 const selected_file = event.target.files[0];
 if(selected_file){
  if(selected_file && fileType.includes(selected_file.type)){
    let reader = new FileReader();
    reader.onload=(e)=>{
      const workbook = read(e.target.result);
      const sheet = workbook.SheetNames;
      if(sheet.length){
        const data = utils.sheet_add_json(workbook.Sheets[sheet[0]])
        setExcelData(data)
      }
    }
    reader.readAsArrayBuffer(selected_file)
  }
  else{
    console.log("Please Upload Excel file only")
  }
  console.log(selected_file.type)
 }

}

     

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />

          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="d-flex">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary mb-2 "
              >
                Add Employee
              </button>
              <ExportToExcel apiData={rows} fileName={fileName}/>
              <div className="fileUpload" >
                  <input type="file" className="upload" onChange={handleImport}/>
                  <span>Import</span>
                </div>
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
                    <div className="table-responsive">
                      <table
                        className="align-middle mb-0 table table-borderless table-striped table-hover"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <thead>
                          <tr>
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
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRows.map((row) => (
                            <tr>
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
                              <td className="text-center">{row.Emp_email}</td>
                              <td className="text-center">{row.Emp_contact_No}</td>
                              <td className="text-center">{row.Emp_department}</td>
                              <td className="text-center">O+</td>
                              <td className="text-center">
                                Mechanical Engineer
                              </td>
                              <td className="text-center">Enginnering</td>
                              <td className="text-center">{row.Emp_city}</td>
                              <td className="text-center">{row.Emp_state}</td>
                              <td className="text-center">{row.Emp_DOB}</td>
                              <td className="text-center">{row.Emp_joining_date}</td>
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
                                onClick={()=>handleDeleteEmployee(row._id)}
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
