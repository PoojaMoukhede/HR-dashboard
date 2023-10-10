import React, { useState, useEffect } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import AttandanceDepartmentWise from "../Components/Table/AttandanceDepartmentWise";
import dummydata from "../Components/Table/Mock.json";

export default function Attandance() {

  const [absentCount, setAbsentCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);

  useEffect(() => {
    fetchDataAndCount();
  }, []);

  const fetchDataAndCount = async () => {
    try {
      const response = dummydata;
      let absent = 0;
      let present = 0;
      response.forEach((record) => {
        if (record.attendance === "present") {
          present++;
        } else if (record.attendance === "absent") {
          absent++;
        }
      });

      setAbsentCount(absent);
      setPresentCount(present);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
            <AttandanceDepartmentWise />


              <div className="row">
                
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-4 widget-content ">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">Total Employee</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{dummydata.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-4 widget-content">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">Present Today</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{presentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-4 widget-content ">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">Absent Today</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{absentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

      
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3 card cardp">
                    <div className="main-card mb-2">
                      <div className="card-header">
                      <i className="header-icon lnr lnr-paperclip icon-gradient bg-asteroid">
                        {" "}
                      </i>
                        Leave Applied</div>
                    </div>
                    functionaity coming soon....
                    {/* <LeaveTable /> */}
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
