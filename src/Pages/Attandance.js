import React from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import ReactApexChart from "react-apexcharts";
import { Baroptions } from "../Components/Data";
import PolorChart from "../Components/PolorChart";

export default function Attandance() {

const chart1Labels = ['Absent', 'Present'];
const chart2Labels = ['Absent', 'Present'];
const chart3Labels = [['On-Site', 'In-Office', 'Pending']];

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
          <div className="row">
              <div className="col-md-12 col-lg-4">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header">
                    <div className="card-header-title">
                      <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                        {" "}
                      </i>
                      Monthly Attandance Report
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="tab-eg-55">
                      <div className="widget-chart p-3">
                        <div style={{ height: "370px" }}>
                        <PolorChart series={[82, 47]} labels={chart1Labels}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header-tab-animation card-header">
                    <div className="card-header-title">
                      <i className="header-icon lnr-apartment icon-gradient bg-love-kiss">
                        {" "}
                      </i>
                      Weekly Attandance Report
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="tabs-eg-77"
                      >
                        <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"style={{ height: "370px" }}>
                           <PolorChart series={[42, 47]}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-lg-4">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header-tab-animation card-header">
                    <div className="card-header-title">
                      <i className="header-icon lnr-apartment icon-gradient bg-love-kiss">
                        {" "}
                      </i>
                      Daily Attandance Report
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="tabs-eg-77"
                      >
                        <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"style={{ height: "370px" }}>
                        <PolorChart series={[42, 47,54]}/>
                        </div>
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
                      <div className="widget-heading">Total Employee</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>600</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-3 widget-content">
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Present Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>579</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="col-md-6 col-xl-4">
                <div className="card11 mb-3 widget-content ">
                  <div className="widget-content-wrapper text-black">
                    <div className="widget-content-left">
                      <div className="widget-heading">Absent Today</div>
                    </div>
                    <div className="widget-content-right">
                      <div className="widget-numbers text-black">
                        <span>21</span>
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

    </>
  );
}
