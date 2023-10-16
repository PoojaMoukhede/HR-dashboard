import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Canteen from "../../Pages/Canteen";

export default function Updates() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/updates")
      .then((response) => {
        setRows(response.data);
        // console.log(`update : ${response.data}`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (rows.usersWithBirthday) {
    rows.usersWithBirthday.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      if (dateA < dateB) return -1;
      if (dateA > dateB) return 1;
      return 0;
    });
  }


  const toastSuccess = () => toast.success("Wishes Sent");

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-magic-wand icon-gradient bg-asteroid">
                  {" "}
                </i>
                Updates For this month
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="tab-eg-55">
                <div className="widget-chart p-3">
                  <div>
                    <div
                      className="table-responsive"
                      style={{ height: "370px", overflowY: "scroll" }}
                    >
                      <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left flex2">
                            <div className="widget-heading">
                              {rows.usersWithBirthday?.map((data) => (
                                <div key={data.Emp_name}>
                                  <div
                                    className="card mb-2"
                                   
                                  >
                                    {/* Birthday Card */}
                                    <div className="row g-0">
                                      {/* Image */}
                                      <div className="col-md-2">
                                        <img
                                          src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'
                                          width="120rem"
                                          className="img-fluid"
                                          style={{width:"4rem", margin:'2.5rem'}}
                                          alt="..."
                                        />
                                      </div>
                                      {/* Card Content */}
                                      <div className="col-md-10">
                                        <div className="card-body">
                                          <h5 className="card-title bday">
                                            Happy Birthday
                                          </h5>
                                          <p className="card-text">
                                            The warmest wishes to{" "}
                                            <b>{data.Emp_name}</b>, a great
                                            member of our team. May your special
                                            day be full of happiness, fun, and
                                            cheer!
                                          </p>
                                          <p className="card-text">
                                            <small className="text-muted">
                                              {data.date}
                                            </small>
                                            <button
                                              className="btn"
                                              style={{
                                                fontSize: "0.8rem",
                                                color: "#24a1e9",
                                              }}
                                              onClick={toastSuccess}
                                            >
                                              Send
                                            </button>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {rows.usersWithWorkAnniversary?.map((data) => (
                                <div key={data.Emp_name}>
                                  <div
                                    className="card mb-2"
                                
                                  >
                                    {/* Work Anniversary Card */}
                                    <div className="row g-0">
                                      {/* Image */}
                                      <div className="col-md-2">
                                        <img
                                          src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png'
                                          width="100rem"
                                          className="img-fluid"
                                          style={{width:"4rem", margin:'2.5rem'}}
                                          alt="..."
                                        />
                                      </div>
                                      {/* Card Content */}
                                      <div className="col-md-10">
                                        <div className="card-body">
                                          <h5 className="card-title bday">
                                            Happy Work Anniversary
                                          </h5>
                                          <p className="card-text">
                                            Happy work-iversary!{" "}
                                            <b>{data.Emp_name}</b> You’re an
                                            incredible team member, and we’re
                                            grateful for your hard work and
                                            dedication over the years.
                                          </p>
                                          <p className="card-text">
                                            <small className="text-muted">
                                              {data.date}
                                            </small>
                                            <button
                                              className="btn"
                                              style={{
                                                fontSize: "0.8rem",
                                                color: "#24a1e9",
                                              }}
                                              onClick={toastSuccess}
                                            >
                                              Send
                                            </button>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
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
        <div className="col-md-12 col-lg-6">
          <Canteen />
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
    </>
  );
}
