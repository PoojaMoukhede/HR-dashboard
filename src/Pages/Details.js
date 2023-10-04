import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import Attandance from "../Components/Charts/Attandance";
import AttandanceTable from "../Components/Charts/AttandanceTable";
import BarChart from "../Components/Charts/BarChart";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import TripDetail from "../Components/Table/TripDetail";

export default function Details() {
  const { id } = useParams();
  const [employeeData, setEmployeedata] = useState();
  const [attandance, setAttandance] = useState([]);
  const [data_Attandance, setData_Attandance] = useState([]);

  const fetchData = async (id) => {
    try {
      const url = `http://localhost:8080`;
      const emp = await axios.get(`${url}/Users/${id}`).then((response) => {
        // console.log({response});
        return response.data;
      });
      setEmployeedata(emp);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    fetchData(id);
    try {
      axios
        .get(`http://localhost:8080/attandance/${id}`)
        .then((response) => {
          // console.log(response)
          setAttandance(response.data);
          // console.log("Attendance from API:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toastSuccess = () => toast.success("Leave Approved");
  const toastError = () => toast.error("Leave Rejected");
  const toastSuccess2 = () => toast.success("Advance Payment Request Approved");
  const toastError2 = () => toast.error("Advance Payment Request Rejected");

  const workHoursData = [
    { date: "2023-09-01", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-02", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-03", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-04", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-05", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-06", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-07", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-08", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-09", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-10", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-11", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-12", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-13", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-14", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-15", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-16", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-17", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-18", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-19", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-20", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-21", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-22", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-23", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-24", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-25", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-26", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-27", regularHours: 8, overtimeHours: 2, belowHours: 0 },
    { date: "2023-09-28", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-29", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    { date: "2023-09-30", regularHours: 6, overtimeHours: 0, belowHours: 2 },
    // Add more workHoursData for different days
  ];

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8080/location/${id}`)
        .then((response) => {
          console.log(response)
          console.log(`response from location api ${response.data.message.Location_info}`)
          setData_Attandance(response.data.message.Location_info);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
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
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: "115px" }}
                      />
                      <h5 className="my-2">{employeeData?.Emp_name}</h5>
                      <p className="text-muted mb-1">
                        {employeeData?.Emp_department}
                      </p>
                      <p className="text-muted mb-1">
                        {employeeData?.Emp_city} , {employeeData?.Emp_state}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-xl-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Employee ID</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {employeeData?.Emp_ID}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {employeeData?.Emp_name}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {employeeData?.email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {employeeData?.Emp_contact_No}
                          </p>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {employeeData?.Emp_city} , {employeeData?.Emp_state}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-4">
                  <div className="mb-3 widget-content bg-arielle-smile">
                    <div className="widget-content-wrapper text-white">
                      <div className="widget-content-left">
                        <div
                          className="widget-heading"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Working Since
                        </div>
                      </div>

                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>{employeeData?.Emp_joining_date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-4">
                  <div className="mb-3 widget-content bg-arielle-smile">
                    <div className="widget-content-wrapper text-white">
                      <div className="widget-content-left">
                        <div
                          className="widget-heading"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Total Hours
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>1200</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-4">
                  <div className="mb-3 widget-content bg-arielle-smile">
                    <div className="widget-content-wrapper text-white">
                      <div className="widget-content-left">
                        <div
                          className="widget-heading"
                          style={{ fontSize: "1.2rem" }}
                        >
                          Total Visit
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>{data_Attandance.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        Daily Attandance Report
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div style={{ height: "370px" }}>
                            {/* <Attandance/> */}
                            <Attandance data={workHoursData} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        Daily In-Out Report
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="tabs-eg-77"
                        >
                          <div
                            className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                            style={{ height: "370px", overflowY: "scroll" }}
                          >
                            <AttandanceTable />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">Leave Status</div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3 d-flex ">
                          <div
                            style={{ height: "300px", width: "50%" }}
                            className="d-flex flex-column"
                          >
                            <BarChart />
                            <span className="d-flex justify-content-center">
                              <h2>16/20</h2>
                              <p className="ms-1">Days</p>
                            </span>
                          </div>
                          <div className="col-md-12 col-xl-6">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="mb-0">Total Leave</p>
                                </div>
                                <div className="col-sm-6">
                                  <p className="text-muted mb-0">20</p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="mb-0">Leave Used</p>
                                </div>
                                <div className="col-sm-6">
                                  <p className="text-muted mb-0">04</p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="mb-0">Status</p>
                                </div>
                                <div className="col-sm-6">
                                  <p className="text-muted mb-0">
                                    Applied for 01 days
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="row mt-5">
                                <div className="col-sm-6">
                                  <button
                                    className="btn_app approve"
                                    onClick={toastSuccess}
                                  >
                                    Approve
                                  </button>
                                </div>
                                <div className="col-sm-6">
                                  <button
                                    className="btn_app reject"
                                    onClick={toastError}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        Advance Payment Details
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="tabs-eg-77"
                        >
                          <div
                            className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                            style={{ height: "300px" }}
                          >
                            <div className="col-md-12 col-xl-12">
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <p className="mb-0">
                                      Total Amount Till Last Month
                                    </p>
                                  </div>
                                  <div className="col-sm-6">
                                    <p className="text-muted mb-0">
                                      22000 &#8377;
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-6">
                                    <p className="mb-0">Claim This Month</p>
                                  </div>
                                  <div className="col-sm-6">
                                    <p className="text-muted mb-0">
                                      4200 &#8377;
                                    </p>
                                  </div>
                                </div>
                                <hr />

                                <div className="row mt-5">
                                  <div className="col-sm-6">
                                    <button
                                      className="btn_app approve"
                                      onClick={toastSuccess2}
                                    >
                                      Approve
                                    </button>
                                  </div>
                                  <div className="col-sm-6">
                                    <button
                                      className="btn_app reject"
                                      onClick={toastError2}
                                    >
                                      Reject
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <TripDetail /> */}

              <div className="row">
        <div className="col-md-12">
          <div className="mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title">
                <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                  {" "}
                </i>
                Employees Location / Trip Detail
              </div>
            </div>
            <div className="table-responsive">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th className="text-center">Start Point</th>
                    <th className="text-center">End Point</th>
                    {/* <th className="text-center">Expanse</th> */}
                  </tr>
                </thead>
                <tbody>
                  {data_Attandance.map((datas) => {
                    return (
                      <tr>
                        <td>
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left flex2">
                                <div className="widget-heading">
                                {new Date(datas.timestamp).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-muted">
                          {datas.startPoint}
                        </td>
                        <td className="text-center text-muted">{datas.endPoint}</td>
                        {/* <td className="text-center text-muted">
                          {}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
