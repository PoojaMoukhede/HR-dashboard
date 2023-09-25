import React,{useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { chartData } from "../Data";
import { chartData2 } from "../Data";
import ReactApexChart from "react-apexcharts";
import Table from "../Table/Table";
import MapC from "../Map/MapC";
import Updates from "../Updates/Updates";
// import ComplaintD from "./ComplaintD";
// import { Link } from "react-router-dom";
import { ThemeContext } from "../Header/ThemeProvider";
import Canteen from "../../Pages/Canteen";

export default function Dashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
     <div className={`App ${theme}`}>
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
          {/* <div className="header-toggle-buttons">
            <button onClick={() => toggleTheme()}>{theme}</button>
          </div> */}
            <div className="row">
              <div className="col-md-6 col-xl-4">
                <div className="mb-3 widget-content bg-plum-plate">
                  <div className="widget-content-wrapper text-white">
                    <div className="widget-content-left">
                      <div className="widget-heading">Attandance</div>
                      <div className="widget-subheading">
                        Last week attandance
                      </div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-white">
                        <span>98%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="mb-3 widget-content bg-night-sky">
                  <div className="widget-content-wrapper text-white">
                    <div className="widget-content-left">
                      <div className="widget-heading">Fuel Consumption</div>
                      <div className="widget-subheading">
                        Last week fuel consumption
                      </div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-white">
                        <span>58 liters</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <div className=" mb-3 widget-content bg-asteroid">
                  <div className="widget-content-wrapper text-white">
                    <div className="widget-content-left">
                      <div className="widget-heading">Expenses</div>
                      <div className="widget-subheading">Last week expense</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-white">
                        <span>48752</span> &#8377;
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
                      <div className="widget-subheading">Till Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>1082 KM</span>
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
                      <div className="widget-subheading">Till Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>176 Liters</span>
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
                      <div className="widget-subheading">Till Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>1,78072 &#8377;</span>
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
                      Monthly Fuel Consumption Report
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="tab-eg-55">
                      <div className="widget-chart p-3">
                        <div style={{ height: "370px" }}>
                          <ReactApexChart
                            options={chartData2.options}
                            series={chartData2.series}
                            type="bar"
                            height={350}
                          />
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
                      Monthly Expense Report
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="tabs-eg-77"
                      >
                        <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                          <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            height={350}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Updates />
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3 card cardp">
                  <Table />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="mb-3 card">
                  <MapC />
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header">
                    <i className="header-icon lnr lnr-pie-chart icon-gradient bg-love-kiss">
                      {" "}
                    </i>
                    <div className="card-header-title">Complaint Overview</div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="tab-eg-55">
                      <div className="widget-chart p-3 d-flex ">
                        <div
                          style={{ width: "50%" }}
                          className="d-flex flex-column"
                        >
                          <ComplaintD />
                        </div>

                        <div className="col-md-12 col-xl-4">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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
                            <h4>12</h4>
                          </div>

                          <div>
                            <h5>Pending</h5>
                            <h4>02</h4>
                            <div
                              className="square"
                              style={{ backgroundColor: "#27ceb8" }}
                            ></div>
                          </div>

                          <div>
                            <h5>In Progress</h5>
                            <h4>04</h4>
                            <div
                              className="square"
                              style={{ backgroundColor: "#63619b" }}
                            ></div>
                          </div>

                          <div>
                            <h5>Completed</h5>
                            <h4>06</h4>
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
                          <div className="progress"  data-placement="top" title="Pending Complaints">
                            <div
                            
                              className="progress-bar"
                              role="progressbar"
                              style={{width: "25%",backgroundColor: "#27ceb8" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>

                          <div className="progress"   data-placement="top" title="In-Progress Complaints">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{width: "50%",backgroundColor: "#63619b" }}
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>

                          <div className="progress"   data-placement="top" title="Solved Complaints">
                            <div
                              className="progress-bar "
                              role="progressbar"
                              style={{width: "75%",backgroundColor: "#f8b146" }}
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
              <div className="col-md-12">
                <div className="mb-3 card">
                 <Canteen/>
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
