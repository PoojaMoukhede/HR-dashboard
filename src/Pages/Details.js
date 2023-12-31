import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import Attandance from "../Components/Charts/Attandance";
import AttandanceTable from "../Components/Charts/AttandanceTable";
import BarChart from "../Components/Charts/BarChart";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ProfileImg from "../Images/man-profile-png.png";
// { onRender } for sidebar

export default function Details() {
  const { id } = useParams();
  const [employeeData, setEmployeedata] = useState();
  const [attandance, setAttandance] = useState([]);
  const [data_location, setData_location] = useState([]);
  const [clearanceData, setClearanceData] = useState(null);
  const [distance, setDistance] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalExpanse, setTotalExpanse] = useState(null);
  const [couponCount, setCouponCount] = useState(null);
  const [leaveData, setLeaveData] = useState([]);
  const [totalLeaveDays, setTotalLeaveDays] = useState(21);
  const [remdays, setRemDays] = useState(null);
  const [fuel, setFuel] = useState(null);

  const fetchData = async (id) => {
    try {
      const emp = await axios
        .get(`http://192.168.1.211:8080/Users/${id}`)
        .then((response) => {
          return response.data;
        });
      setEmployeedata(emp);
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://192.168.1.211:8080/leave-balance/${id}`)
      .then((response) => {
        const availableLeave = response.data.message.availableLeave;

        // Calculate remaining leave days
        const remainingLeaveDays = totalLeaveDays - availableLeave;
        setRemDays(remainingLeaveDays);
      })
      .catch((error) => {
        console.error("Error fetching leave balance:", error);
      });
  }, [id, totalLeaveDays]);
  useEffect(() => {
    fetchData(id);
    try {
      axios
        .get(`http://192.168.1.211:8080/attandance/${id}`)
        .then((response) => {
          setAttandance(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const toastSuccess2 = () => toast.success("Advance Payment Request Approved");
  const toastError2 = () => toast.error("Advance Payment Request Rejected");

  useEffect(() => {
    try {
      axios
        .get(`http://192.168.1.211:8080/location/${id}`)
        .then((response) => {
          const locationInfo = response.data.message.Location_info;
          const distances = locationInfo.map((location) => location.distance);
          setData_location(locationInfo);
          setDistance(distances);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get(`http://192.168.1.211:8080/leave/${id}`)
        .then((response) => {
          const leaveInfo = response.data.leaveApplications;
          setLeaveData(response.data.leaveApplications);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get(`http://192.168.1.211:8080/coupon/${id}`)
        .then((response) => {
          const coupon_Count = response.data.totalCoupons;
          setCouponCount(coupon_Count);
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
      const total = distance.reduce(
        (acc, current) => acc + parseFloat(current),
        0
      );
      setTotalDistance(total.toFixed(2));
    }
  }, [distance]);

  useEffect(() => {
    axios
      .get(`http://192.168.1.211:8080/form/${id}`)
      .then((response) => {
        const totalExpanse = response.data.totalExpenses;
        const totalFuel = response.data.totalFuelLiters;
        setTotalExpanse(totalExpanse);
        setFuel(totalFuel);
        setClearanceData(response.data.message.FormData);
      })
      .catch((error) => {
        console.error("Error fetching clearance data:", error);
      });
  }, [id]);

  const [enlarged, setEnlarged] = useState(null);

  const handleImageClick = (index) => {
    if (enlarged === index) {
      setEnlarged(null);
    } else {
      setEnlarged(index);
    }
  };

  const closeEnlargedView = () => {
    setEnlarged(false);
  };

  const [leaveStatus, setLeaveStatus] = useState({});

  // Initialize leaveStatus with default "Pending" for all leave requests
  useEffect(() => {
    const initialStatus = {};
    leaveData.forEach((leave) => {
      initialStatus[leave._id] = "Pending";
    });
    setLeaveStatus(initialStatus);
  }, [leaveData]);

  const handleLeaveAction = async (id, status) => {
    try {
      const leave = leaveData.find((leave) => leave._id === id);

      if (!leave) {
        console.error("Leave not found for ID:", id);
        return;
      }

      // Check if the start date is expired
      const startDate = new Date(leave.startDate);
      const currentDate = new Date();

      if (startDate <= currentDate) {
        // Start date is expired, so disable both buttons
        toast.error("Leave date has already passed.");
        return;
      }

      // Send a PUT request to update the leave status
      const response = await axios.put(
        `http://192.168.1.211:8080/leave/${id}`,
        {
          status,
        }
      );
      // console.log(`console :${id}`);

      // Update the leaveData state with the updated status
      setLeaveData((prevState) =>
        prevState.map((leave) =>
          leave._id === id ? { ...leave, status } : leave
        )
      );

      setLeaveStatus((prevStatus) => ({
        ...prevStatus,
        [id]: status,
      }));

      if (status === "approved") {
        toast.success("Leave Approved");
      } else if (status === "rejected") {
        if (response.data && response.data.error) {
          const error = response.data.error;
          toast.error(error);
        } else {
          toast.error("An error occurred while processing the request.");
        }
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className="app-container body-tabs-shadow fixed-sidebar fixed-header">
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
                        src={
                          employeeData?.profileImage
                            ? `data:image/${
                                employeeData.profileImage.contentType
                              };base64,${btoa(
                                String.fromCharCode(
                                  ...new Uint8Array(
                                    employeeData.profileImage.data.data
                                  )
                                )
                              )}`
                            : ProfileImg
                        }
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: "115px", height: "9.65rem" }}
                      />
                      <h5 className="my-2 fw-bolder">{employeeData?.Emp_name}</h5>
                      <p className="text-muted mb-1">
                        {employeeData?.Emp_department}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-xl-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="fw-bolder">Employee ID</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_ID}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Full Name</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_name}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Email</td>
                                <td className="text-muted fw-bolder">{employeeData?.email}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Phone</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_contact_No}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Address</td>
                                <td className="text-muted fw-bolder">
                                  {employeeData?.Emp_city},{" "}
                                  {employeeData?.Emp_state}, (
                                  {employeeData?.Emp_country})
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-6">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="fw-bolder">Department</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_department}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Expertise</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_expertise}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Blood Group</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_blood_group}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Date Of Birth</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_DOB}</td>
                              </tr>
                              <tr>
                                <td className="fw-bolder">Designation</td>
                                <td className="text-muted fw-bolder">{employeeData?.Emp_designation}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-4">
                  <div className="mb-3 widget-content bgColor">
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
                  <div className="mb-3 widget-content bgColor">
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
                  <div className="mb-3 widget-content bgColor">
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
                <div className="col-md-6 col-xl-4" style={{color:"white"}}>
                  <div className="card11 mb-3 widget-content bgColor">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading" >
                          Total Coupon Purchased
                        </div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          {couponCount ? <span>{couponCount}</span> : 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-4" style={{color:"white"}}>
                  <div className="card11 mb-3 widget-content bgColor">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Total Fuel Consumption
                        </div>
                        <div className="widget-subheading">
                          Till this month (in leters)
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{fuel}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-4" style={{color:"white"}}>
                  <div className="card11 mb-3 widget-content bgColor">
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

              {/* attandance details */}
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <Attandance />
                </div>
                <div className="col-md-12 col-lg-6">
                  <AttandanceTable />
                </div>
              </div>
              {/* attandance details */}

              {/* leave status / advance */}
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
                    <div className="tab-content ">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3 d-flex ">
                          <div
                            style={{ height: "250px", width: "50%" }}
                            className="d-flex flex-column"
                          >
                            <BarChart />
                          </div>

                          <div className="col-md-12 col-xl-6">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="mb-0">Total Leave</p>
                                </div>
                                <div className="col-sm-6">
                                  <p className="text-muted mb-0">
                                    {totalLeaveDays}
                                  </p>
                                </div>
                              </div>
                              <hr />
                              <div className="row">
                                <div className="col-sm-6">
                                  <p className="mb-0">Leave Used</p>
                                </div>
                                <div className="col-sm-6">
                                  <p className="text-muted mb-0">{remdays}</p>
                                </div>
                              </div>

                              <hr />
                              <div className="row mt-5">
                                <div className="col-sm-5"></div>
                                <div className="col-sm-5">
                                  <button
                                    className="btn"
                                    style={{
                                      backgroundColor: "#129cf7",
                                      color: "white",
                                      width: "10rem",
                                    }}
                                    onClick={toggleModal}
                                  >
                                    View Details
                                  </button>
                                </div>

                                <Modal
                                  show={showModal}
                                  onHide={toggleModal}
                                  size="lg"
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>
                                      Employees Leave Record
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div
                                      className="table-responsive"
                                      style={{
                                        height: "370px",
                                        overflowY: "scroll",
                                      }}
                                    >
                                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                        <thead>
                                          <tr>
                                            <th>Days</th>
                                            <th className="text-center">
                                              Start Date
                                            </th>
                                            <th className="text-center">
                                              End Date
                                            </th>
                                            <th className="text-center">
                                              Status
                                            </th>
                                            <th className="text-center">
                                              Action
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {leaveData.map((leaves, index) => (
                                            <tr key={leaves._id}>
                                              <td>
                                                <div className="widget-content p-0">
                                                  <div className=" widget-content-wrapper">
                                                    <div className=" widget-content-left flex2">
                                                      <div className="widget-heading">
                                                        {leaves.numberOfDays}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className="text-center text-muted">
                                                {new Date(
                                                  leaves.startDate
                                                ).toLocaleString("en-US", {
                                                  year: "numeric",
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                })}
                                              </td>
                                              <td className="text-center text-muted">
                                                {new Date(
                                                  leaves.endDate
                                                ).toLocaleString("en-US", {
                                                  year: "numeric",
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                })}
                                              </td>
                                              <td className="text-center text-muted">
                                                {leaves.status}
                                              </td>
                                              <td className="text-center text-muted">
                                                <span>
                                                  <OverlayTrigger
                                                    key="tooltip41"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id="tooltip">
                                                        Approve Leave
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <button
                                                      onClick={() =>
                                                        handleLeaveAction(
                                                          leaves._id,
                                                          "approved"
                                                        )
                                                      }
                                                      style={{
                                                        color: "white",
                                                        backgroundColor:
                                                          "rgb(7, 116, 7)",
                                                        fontSize: "1rem",
                                                        border: "none",
                                                        marginRight: "4px",
                                                      }}
                                                    >
                                                      <Icon
                                                        icon="icon-park-solid:correct"
                                                        color="white"
                                                      />
                                                    </button>
                                                  </OverlayTrigger>
                                                  <OverlayTrigger
                                                    key="tooltip42"
                                                    placement="top"
                                                    overlay={
                                                      <Tooltip id="tooltip">
                                                        Reject Leave
                                                      </Tooltip>
                                                    }
                                                  >
                                                    <button
                                                      onClick={() =>
                                                        handleLeaveAction(
                                                          leaves._id,
                                                          "rejected"
                                                        )
                                                      }
                                                      style={{
                                                        color: "white",
                                                        backgroundColor:
                                                          "rgb(165, 15, 15)",
                                                        fontSize: "1rem",
                                                        border: "none",
                                                        marginRight: "4px",
                                                      }}
                                                    >
                                                      <Icon
                                                        icon="raphael:cross"
                                                        color="white"
                                                        width="22"
                                                        hFlip={true}
                                                        vFlip={true}
                                                      />
                                                    </button>
                                                  </OverlayTrigger>
                                                </span>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={toggleModal}
                                    >
                                      Close
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
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
                            style={{ height: "250px" }}
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
                      style={{ height: "370px", overflowY: "scroll" }}
                    >
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>DATE</th>
                            <th>TIME</th>
                            <th className="text-center">Start Point</th>
                            <th className="text-center">End Point</th>
                            <th>Distance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data_location.map((location, index) => {
                            return (
                              <tr>
                                <td>
                                  <div className="widget-content p-0">
                                    <div className="widget-content-wrapperr">
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
              {/* leave details */}

              {/* bills  */}
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
                            <th className="text-center">Fuel in Liters</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clearanceData?.map((formData, index) => {
                            return (
                              <React.Fragment key={index}>
                                <tr>
                                  <td>
                                    <div className="widget-content  p-0">
                                      <div className=" widget-content-wrapper">
                                        <div className=" widget-content-left flex2">
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
                                  <td className="text-center text-muted">
                                    {formData.Fuel_in_liters}
                                  </td>

                                  <td></td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* bills  */}

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
