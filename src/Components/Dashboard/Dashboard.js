import React from "react";
// import "./dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { chartData } from "../Data";
import { chartData2 } from "../Data";
import ReactApexChart from "react-apexcharts";
import Table from "../Table/Table";
import MapC from "../Map/MapC";
import {Link} from 'react-router-dom'

export default function Dashboard() {

  return (
    <>
      <div className="app-main">
        <Sidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
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
                      <div className="widget-heading">Total Distance Covered</div>
                      <div className="widget-subheading">
                        Till Today
                      </div>
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
                      <div className="widget-heading">Total Fuel Consumption</div>
                      <div className="widget-subheading">
                      Till Today
                      </div>
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
                      <div className="widget-subheading">
                      Till Today
                      </div>
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
                      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
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
                      <i className="header-icon lnr-apartment icon-gradient bg-love-kiss">
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
            
          </div>
        </div>
      </div>
    </>
  );
}
