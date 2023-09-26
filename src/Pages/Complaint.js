import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


export default function Complaint() {
  const [showContainer, setShowContainer] = useState(true);

  const handleRemoveContainer = () => {
    setShowContainer(false);
    toast.success("This complaint marked as completed");
  };

  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState({});
  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/complaint")
      .then((response) => {
        setComplaints(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://192.168.1.211:8080/empdata")
      .then((response) => {
        const userLookup = {};
        response.data.forEach((user) => {
          userLookup[user._id] = user;
        });
        setUsers(userLookup);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  const countPendingComplaints = complaints.filter((complaint) => complaint.status === 'Pending').length;
  const countResolvedComplaints = complaints.filter((complaint) => complaint.status === 'Resolved').length;
  // const toastSuccess = () =>
  //   toast.success("This complaint marked as completed");
  
  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
      <Header />
      <div className="app-main">
        <Sidebar />
        {/* content */}
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header">
                    <div className="card-header-title">
                      <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                        {" "}
                      </i>
                      Complaint Overview
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="tab-eg-55">
                      <div className="widget-chart p-3">
                        <div
                          className="d-flex"
                          style={{
                            height: "80px",
                            justifyContent: "space-around",
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <h5>Total</h5>
                            <h4>{complaints.length}</h4>
                          </div>

                          <div>
                            <h5>Pending</h5>
                            <h4>{countPendingComplaints}</h4>
                            <div
                              className="square"
                              style={{ backgroundColor: "#27ceb8" }}
                            ></div>
                          </div>

                          <div>
                            <h5>In Progress</h5>
                            <h4>{complaints.length}</h4>
                            <div
                              className="square"
                              style={{ backgroundColor: "#63619b" }}
                            ></div>
                          </div>

                          <div>
                            <h5>Completed</h5>
                            <h4>{countResolvedComplaints}</h4>
                            <div
                              className="square"
                              style={{ backgroundColor: "#f8b146" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header-tab-animation card-header">
                    <div className="card-header-title">
                      <i className="header-icon lnr lnr-chart-bars icon-gradient bg-asteroid">
                        {" "}
                      </i>
                      Complaint Overview
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="tabs-eg-77"
                      >
                        <div
                          style={{ height: "80px" }}
                          className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                        >
                          <div
                            className="progress"
                            data-placement="top"
                            title="Pending Complaints"
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: "25%",
                                backgroundColor: "#27ceb8",
                              }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>

                          <div
                            className="progress"
                            data-placement="top"
                            title="In-Progress Complaints"
                          >
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{
                                width: "50%",
                                backgroundColor: "#63619b",
                              }}
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>

                          <div
                            className="progress"
                            data-placement="top"
                            title="Solved Complaints"
                          >
                            <div
                              className="progress-bar "
                              role="progressbar"
                              style={{
                                width: "75%",
                                backgroundColor: "#f8b146",
                              }}
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-12">
               {/* <div className="mb-3 card"> */}
               {/* {showContainer && ( */}
                <ul className="complaint_cards">
                  {complaints.map((complaint) => (

                    <div className="card mt-1">
                      {/* <div className="card-header">Complaint Number 52</div> */}
                      <div className="card-body d-flex flex-row">
                        <li key={complaint._id} style={{width:'80%'}}>
                          <p className="text-dark" style={{fontSize:'0.9rem'}}> <b><i>Issue :</i></b> {complaint.Message[0].message}</p>

                          {users[complaint.userRef] ? (
                            <p style={{fontSize:'0.9rem'}}> <b><i>Name: </i></b>{users[complaint.userRef].name}</p>
                          ) : (
                            <p>Name: Loading...</p>
                          )}
                        </li>

                        <div>
                          {/* <button
                        className="mr-2 btn"
                        style={{
                          backgroundColor: "#403e93",
                          border: "none",
                          padding: "0.5rem",
                          borderRadius: "0.3rem",
                          color: "white",
                          fontSize: "0.9rem",
                        }}
                      >
                        Take
                      </button> */}
                          <button
                            style={{
                              backgroundColor: "#f8b146",
                              border: "none",
                              padding: "0.5rem",
                              margin: "1rem",
                              borderRadius: "0.3rem",
                              color: "white",
                              fontSize: "0.9rem",
                           
                            }}
                            // onClick={toastSuccess}
                            onClick={handleRemoveContainer}
                          >
                            Resolve
                          </button>
                        </div>
                      </div>
                    </div>
                    
                  ))}
                </ul>
                 {/* )} */}
                {/* <div className="card mt-4">
                  <div className="card-header">Complaint Number 91</div>
                  <div className="card-body d-flex">
                    <blockquote
                      className="blockquote mb-0"
                      style={{ width: "85%" }}
                    >
                      <p>
                        Hello sir/ma'am <br />
                        Issue regarding advance payment.
                        <br />
                        Thankyou
                      </p>
                      <footer className="blockquote-footer">
                        Dhruva Solanki <cite title="Source Title">{1554}</cite>
                      </footer>
                    </blockquote>
                    <div>
                      <button
                        className="mr-2 btn"
                        style={{
                          backgroundColor: "#403e93",
                          border: "none",
                          padding: "0.5rem",
                          borderRadius: "0.3rem",
                          color: "white",
                          fontSize: "0.9rem",
                        }}
                      >
                        Take
                      </button>
                      <button
                        style={{
                          backgroundColor: "#f8b146",
                          border: "none",
                          padding: "0.5rem",
                          borderRadius: "0.3rem",
                          color: "white",
                          fontSize: "0.9rem",
                        }}
                        onClick={toastSuccess}

                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card mt-4">
                  <div className="card-header">Complaint Number 104</div>
                  <div className="card-body d-flex">
                    <blockquote className="blockquote mb-0" style={{width:'85%'}}>
                      <p>
                        Hello sir/ma'am <br />
                        I have a complain about the booking of my flight ticket.
                        It is showing that it has been booked but when i checked
                        on the website no tickets are booked their.
                        <br /> Kindly look into that.
                        <br />
                        Thankyou
                      </p>
                      <footer className="blockquote-footer">
                        Swati Chauhan <cite title="Source Title">{1059}</cite>
                      </footer>
                    </blockquote>
                    <div>
                      <button
                        className="mr-2 btn"
                        style={{
                          backgroundColor: "#403e93",
                          border: "none",
                          padding: "0.5rem",
                          borderRadius: "0.3rem",
                          color: "white",
                          fontSize: "0.9rem",
                        }}
                      >
                        Take
                      </button>
                      <button
                        style={{
                          backgroundColor: "#f8b146",
                          border: "none",
                          padding: "0.5rem",
                          borderRadius: "0.3rem",
                          color: "white",
                          fontSize: "0.9rem",
                        }}
                        onClick={toastSuccess}
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                </div> */}
              {/* </div>//extra div of card */}
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
  );
}
