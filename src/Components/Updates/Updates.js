import React, { useEffect, useState} from "react";
import axios from "axios";
import Canteen from "../../Pages/Canteen";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

export default function Updates() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/updates")
      .then((response) => {
        setRows(response.data);
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


  const sendEmail = (userEmail, userName, usersWithBirthday) => {
    if (!userEmail) {
      console.error("Email address is empty or undefined.");
      return;
    }
    const currentDate = new Date();
    if (usersWithBirthday !== currentDate.toISOString().split("T")[0]) {
      toast.error("Birth Date has expired. Email not sent.");
      return;
    }

    const templateParams = {
      to_email: userEmail,
      Emp_name: userName,
    };
    emailjs
      .send(
        "service_1p5hnfn",
        "template_52ov41w",
        templateParams,
        "xmDHyItmmFUHqFhv0"
      )
      .then((result) => {
        console.log(`result.text: ${result.text}`);
        console.log(`Email sent to: ${userEmail}`);
      })
      .catch((error) => {
        console.log(`error.text: ${error.text}`);
      });
  };

  const sendEmail2 = (userEmail, userName, workAnniversaryDate) => {
    if (!userEmail) {
      console.error("Email address is empty or undefined.");
      return;
    }

    const currentDate = new Date();

    if (workAnniversaryDate !== currentDate.toISOString().split("T")[0]) {
      toast.error("Work anniversary has expired. Email not sent.");
      return;
    }

    const templateParams = {
      to_email: userEmail,
      Emp_name: userName,
    };
    emailjs
      .send(
        "service_1p5hnfn",
        "template_drol7vb",
        templateParams,
        "xmDHyItmmFUHqFhv0"
      )
      .then((result) => {
        console.log(`result.text: ${result.text}`);
        console.log(`Email sent to: ${userEmail}`);
      })
      .catch((error) => {
        console.log(`error.text: ${error.text}`);
      });
  };
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
                                  <div className="card mb-2">
                                    {/* Birthday Card */}
                                    <div className="row g-0">
                                      <div className="col-md-2">
                                        <img
                                          src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                                          width="120rem"
                                          className="img-fluid"
                                          style={{
                                            width: "4rem",
                                            margin: "2.5rem",
                                          }}
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
                                                onClick={() => { sendEmail(data.email,data.Emp_name)}}
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
                                  <div className="card mb-2">
                                    {/* Work Anniversary Card */}
                                    <div className="row g-0">
                                      <div className="col-md-2">
                                        <img
                                          src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                                          width="100rem"
                                          className="img-fluid"
                                          style={{
                                            width: "4rem",
                                            margin: "2.5rem",
                                          }}
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
                                              onClick={() => { sendEmail2(data.email,data.Emp_name)}}
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



 // const sendEmail = (userEmail,userName) => {
  //   if (!userEmail) {
  //     console.error("Email address is empty or undefined.");
  //     return;
  //   }
  //   // console.log(`function call 2222222222222222222222222`);
  //   const templateParams = {
  //     to_email: userEmail,
  //     Emp_name:userName
  //   };
  //   emailjs
  //     .send(
  //       "service_1p5hnfn",
  //       "template_52ov41w",
  //       templateParams,
  //       "xmDHyItmmFUHqFhv0"
  //     )
  //     .then((result) => {
  //       console.log(`result.text: ${result.text}`);
  //       console.log(`Email sent to: ${userEmail}`);
  //     })
  //     .catch((error) => {
  //       console.log(`error.text: ${error.text}`);
  //     });
  // };


  // const sendEmail2 = (userEmail,userName) => {
    
  //   if (!userEmail) {
  //     console.error("Email address is empty or undefined.");
  //     return;
  //   }
  //   // console.log(`function call 2222222222222222222222222`);
  //   const templateParams = {
  //     to_email: userEmail,
  //     Emp_name:userName
  //   };
  //   emailjs
  //     .send(
  //       "service_1p5hnfn",
  //       "template_drol7vb",
  //       templateParams,
  //       "xmDHyItmmFUHqFhv0"
  //     )
  //     .then((result) => {
  //       console.log(`result.text: ${result.text}`);
  //       console.log(`Email sent to: ${userEmail}`);
  //       // console.log(`Email sent to: ${userName}`);

  //     })
  //     .catch((error) => {
  //       console.log(`error.text: ${error.text}`);
  //     });
  // };