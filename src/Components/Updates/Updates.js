import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Canteen from "../../Pages/Canteen";

export default function Updates() {
  const [row, setRows] = useState([]);
  const nevigate = useNavigate();
  const rows = [
    { Emp_name: "Piyush Soni", Emp_id: "1357", Rank: "25" },
    { Emp_name: "Kushal Mishra", Emp_id: "572", Rank: "25" },
    { Emp_name: "Hitesh Kumawat", Emp_id: "1215", Rank: "23" },
    { Emp_name: "Rohit Nair", Emp_id: "1541", Rank: "22" },
    { Emp_name: "Himanshu Desai", Emp_id: "692", Rank: "22" },
    { Emp_name: "Devesh Panday", Emp_id: "1257", Rank: "21" },
    { Emp_name: "Umesh Prajapati", Emp_id: "982", Rank: "21" },
    { Emp_name: "Manmeet Singh", Emp_id: "1025", Rank: "21" },
    { Emp_name: "Meet Choudhary", Emp_id: "1477", Rank: "21" },
    { Emp_name: "Pooja Moukhede", Emp_id: "1477", Rank: "21" },
  ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(firestore, "employees"));
  //       const data = [];

  //       querySnapshot.forEach((doc) => {
  //         data.push(doc.data());
  //       });

  //       setRows(data);
  //     } catch (error) {
  //       console.error("Error fetching data from Firestore:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
  axios
   .get("http://localhost:8080/employees")
   .then((response) => {
     setRows(response.data);
  
   })
   .catch((error) => {
     console.error("Error fetching data:", error);
   });
      
  // Example usage
  // const todayBirthdayPeople = Today(Data);
  // console.log(todayBirthdayPeople);
  
  }, []);

  const toastSuccess = () => toast.success("Wishes Sent");

  function Today(person) {
    const currentDate = new Date(); // Get the current date
  
    // Extract the current day and month
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
  
    // Filter the data based on matching day and month
    const filteredData = person.filter((data) => {
      const birthdayDate = new Date(data.birthday);
      const birthdayDay = birthdayDate.getDate();
      const birthdayMonth = birthdayDate.getMonth();
  
      return currentDay === birthdayDay && currentMonth === birthdayMonth;
    });
  
    return filteredData;
  }
  

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-chart-bars icon-gradient bg-tempting-azure">
                  {" "}
                </i>
                Updates For this month
              </div>
            </div>
            <div className="tab-content">
              <div className="tab-pane fade active show" id="tab-eg-55">
                <div className="widget-chart p-3">
                {/* {row.map((data)=>{ */}
                                
                             
                  <div style={{ height: "370px", overflowY: "scroll" }}>
                    <div className="table-responsive">
                      <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                          <div className="widget-content-left flex2">
                            <div className="widget-heading">
                              
                              <div
                                className="card mb-2"
                                style={{ maxwidth: "540px" }}
                              >
                                <div className="row g-0">
                                  <div className="col-md-2">
                                    <img
                                      src="data:image/png;base64,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"
                                      width="120rem"
                                      className="img-fluid"
                                      style={{ borderRadius: "50%" }}
                                      alt="..."
                                    />
                                  </div>
                                  <div className="col-md-10">
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        Happy 2nd Work Anniversary
                                      </h5>
                                      <p className="card-text">
                                        Happy work-iversary!{" "}
                                        <b>Swati Chauhan </b>You’re an
                                        incredible team member, and we’re
                                        grateful for your hard work and
                                        dedication over the years.
                                      </p>
                                      <p className="card-text">
                                        <small className="text-muted">
                                          Today 
                                        {/* {Today(data)} */}
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

                              <div
                                className="card mb-2"
                                style={{ maxwidth: "540px" }}
                              >
                                <div className="row g-0">
                                  <div className="col-md-2">
                                    <img
                                      src="https://img.freepik.com/premium-vector/vector-flat-icon-woman-with-red-hair-pink-shirt_176841-6797.jpg"
                                      width="100rem"
                                      className="img-fluid"
                                      style={{ borderRadius: "50%" }}
                                      alt="..."
                                    />
                                  </div>
                                  <div className="col-md-10">
                                    <div className="card-body">
                                      <h5 className="card-title">Happy Birthday</h5>
                                      <p className="card-text">
                                        The warmest wishes to{" "}
                                        <b>Pooja Moukhede</b> a great member of
                                        our team. May your special day be full
                                        of happiness, fun and cheer!
                                      </p>
                                      <p className="card-text">
                                        <small className="text-muted">
                                          2023-09-13
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

                              <div
                                className="card mb-2"
                                style={{ maxwidth: "540px" }}
                              >
                                <div className="row g-0">
                                  <div className="col-md-2">
                                    <img
                                      src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18514.jpg?w\u003d2000"
                                      width="100rem"
                                      className="img-fluid"
                                      style={{ borderRadius: "50%" }}
                                      alt="..."
                                    />
                                  </div>
                                  <div className="col-md-10">
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        Welcome To Our Team
                                      </h5>
                                      <p className="card-text">
                                        Congratulations! <b>Shravan Patel</b>{" "}
                                        You’re going to be an amazing addition
                                        to this team
                                      </p>
                                      <p className="card-text">
                                        <small className="text-muted">
                                          2023-09-15
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

                              <div
                                className="card mb-2"
                                style={{ maxwidth: "540px" }}
                              >
                                <div className="row g-0">
                                  <div className="col-md-2">
                                    <img
                                      src="https://img.freepik.com/premium-vector/young-man-avatar-character-vector-illustration-design_24877-18514.jpg?w\u003d2000"
                                      width="100rem"
                                      className="img-fluid"
                                      style={{ borderRadius: "50%" }}
                                      alt="..."
                                    />
                                  </div>
                                  <div className="col-md-10">
                                    <div className="card-body">
                                      <h5 className="card-title">Farewell</h5>
                                      <p className="card-text">
                                        <b>Sourabh Patel</b> You’ve been a
                                        valuable member of the team, and you’ll
                                        be missed. Wishing you all the best in
                                        your new job.
                                      </p>
                                      <p className="card-text">
                                        <small className="text-muted">
                                          2023-09-10
                                        </small>
                                        <button
                                          className="btn"
                                          style={{
                                            fontSize: "0.8rem",
                                            color: "#24a1e9",
                                          }}
                                          onClick={
                                            // nevigate('/noti')
                                            toastSuccess
                                          }
                                        >
                                          Send
                                        </button>
                                      </p>
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
                   {/* })} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          {/* <div className="mb-3 card">
            <div className="card-header-tab card-header-tab-animation card-header">
              <div className="card-header-title">
                <i className="header-icon lnr lnr-star-half icon-gradient  bg-love-kiss"></i>
                leadership board
              </div>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tabs-eg-77">
                  <div
                    className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                    style={{ height: "370px", overflowY: "scroll" }}
                  >
                    <div className="table-responsive">
                      <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Employee ID</th>
                            <th className="text-center">Employee Name</th>
                            <th className="text-center">No. of Visit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row) => (
                            <tr>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left flex2">
                                      <div className="widget-heading">
                                        {row.Emp_id}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center text-muted">
                                {row.Emp_name}
                              </td>
                              <td className="text-center text-muted">
                                {row.Rank}
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
          </div> */}
                 <Canteen/>

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
