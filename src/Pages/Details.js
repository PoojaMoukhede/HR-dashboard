import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import Attandance from "../Components/Charts/Attandance";
import AttandanceTable from "../Components/Charts/AttandanceTable";
import BarChart from "../Components/Charts/BarChart";
import { ToastContainer, toast } from "react-toastify";
import { useActionData, useParams } from "react-router-dom";
import axios from "axios";
// import TripDetail from "../Components/Table/TripDetail";

export default function Details() {
  const { id } = useParams();
  const [employeeData, setEmployeedata] = useState();
  const [attandance, setAttandance] = useState([]);
  const [data_location, setData_location] = useState([]);
  const [clearanceData, setClearanceData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [distance, setDistance] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalExpanse,setTotalExpanse] = useState(null)

  const fetchData = async (id) => {
    try {
      const emp = await axios
        .get(`http://localhost:8080/Users/${id}`)
        .then((response) => {
          // console.log({response});
          return response.data;
        });
      setEmployeedata(emp);
    } catch (error) {
      console.log("err", error);
    }
  };

  const [overtimeHours, setOvertimeHours] = useState(0);
  const [belowTimeHours, setBelowTimeHours] = useState(0);

  // useEffect(() => {
  //   fetch(`http://localhost:8080/attendance`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ userId: '651e4de3b38144033cf2fae2', isPunchIn:false, timer: 1848232}),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.overtimeHours !== undefined && data.belowTimeHours !== undefined) {
  //         setOvertimeHours(data.overtimeHours);
  //         setBelowTimeHours(data.belowTimeHours);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }, []);


  useEffect(() => {
    fetchData(id);
    try {
      axios
        .get(`http://localhost:8080/attandance/${id}`)
        .then((response) => {
          console.log(response.data.message.Employee_attandance)
          setAttandance(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

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
          const locationInfo = response.data.message.Location_info;
          const distances = locationInfo.map((location) => location.distance);
          setData_location(locationInfo);
          setDistance(distances);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.error("Error:", e);
    }
  }, []);

  useEffect(() => {
   
    if (distance !== null) {
      const total = distance.reduce((acc, current) => acc + parseFloat(current),0);
      setTotalDistance(total.toFixed(2));;
    }
  }, [distance]);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/form/${id}`)
      .then((response) => {
        // console.log(`response : ${response.data.message.FormData}`)
        setClearanceData(response.data.message.FormData);
        const binaryData = response.data.message.FormData;
        const totalExpanse = response.data.totalExpenses
        setTotalExpanse(totalExpanse)
        // console.log(`binaryData : ${binaryData}`)
        const imageUrls = binaryData.map((formData) => {
          // console.log(`formData : ${formData}`)
          const imageBuffer = formData.images.data.data;
          const blob = new Blob([imageBuffer], {
            type: formData.images.contentType,
          });
          return URL.createObjectURL(blob);
        });
        
        setImageData(imageUrls);
        // console.log(imageUrls)
      })
      .catch((error) => {
        console.error("Error fetching clearance data:", error);
      });
  }, [id]);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              {/* <p>
                Overtime:{" "}
              {overtimeHours}
              </p>
              <p>
                Below Time:{" "}
                {belowTimeHours}
              </p> */}

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
                          Total Distance
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          {totalDistance ? (
                            <span>{totalDistance} KM</span>
                          ) : (
                            <span>No records</span>
                          )}
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
                          <span>{data_location.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-3 widget-content ">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Total Distance Covered
                        </div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          {/* <span>{totalDistance} KM</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-3 widget-content">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Total Fuel Consumption
                        </div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          {/* <span>{cumulativeFuelConsumption} Liters</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-3 widget-content ">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">Total Expenses</div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{totalExpanse} &#8377;</span>
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
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                          {" "}
                        </i>
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
                        <i className="header-icon lnr lnr-layers icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Daily In-Out Report
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="tabs-eg-77"
                        >
                          <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
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
                      <div className="card-header-title">
                        <i className="header-icon lnr lnr-layers icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Leave Status
                      </div>
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
                        <i className="header-icon lnr lnr-layers icon-gradient bg-night-sky">
                          {" "}
                        </i>
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
                        <i className="header-icon  lnr lnr-rocket icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Employees Location / Trip Detail
                      </div>
                    </div>
                    <div
                      className="table-responsive"
                      style={{ overflowY: "scroll" }}
                    >
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th className="text-center">Start Point</th>
                            <th className="text-center">End Point</th>
                            <th>Distance</th>
                            {/* <th className="" >Distance</th> */}
                            {/* <th className="text-center">Expanse</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {data_location.map((location, index) => {
                            return (
                              <tr>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left flex2">
                                        <div className="widget-heading">
                                          {new Date(
                                            location.timestamp
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {new Date(location.timestamp).toLocaleString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    }
                                  )}
                                </td>
                                <td className="text-center text-muted">
                                  {location.startPoint.startPointname}
                                </td>
                                <td className="text-center text-muted">
                                  {location.endPoint.endPointname}
                                </td>
                                <td>{location.distance} km</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <i className="header-icon  lnr lnr-rocket icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Bills
                      </div>
                    </div>
                    <div
                      className="table-responsive"
                      style={{ overflowY: "scroll" }}
                    >
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>DATE</th>
                            <th className="text-center">Transportation Type</th>
                            <th className="text-center">Expanse</th>
                            <th>Imgae Name</th>
                            <th>Image</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clearanceData?.map((formData, index) => {
                            return (
                              <tr>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapper">
                                      <div className="widget-content-left flex2">
                                        <div className="widget-heading">
                                          {new Date(
                                            formData.timestamp
                                          ).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-center text-muted">
                                  {formData.Transport_type}
                                </td>
                                <td className="text-center text-muted">
                                  {formData.Total_expense}
                                </td>
                                <td className="text-muted">
                                  {formData.ImageName}
                                </td>
                                <td>
                                  {imageData[index] ? (
                                    // <img src={imageData[index]} alt={`${console.log(imageData[index])}`} />
                                    <img
                                      src={imageData[index]}
                                      alt={formData.ImageName}
                                    />
                                  ) : (
                                    <p>No image available</p>
                                  )}
                                </td>
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
