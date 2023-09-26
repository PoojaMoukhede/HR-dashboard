import React from "react";
import Coupon from "../Components/Coupon/Coupon";

export default function Canteen() {
  return (
    <>             <div className="mb-3 card">
    <div className="card-header-tab card-header">
      <div className="card-header-title">
        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
          {" "}
        </i>
        Canteen Overview
      </div>
    </div>
    <div className="tab-content">
      <div className="tab-pane fade active show" id="tab-eg-55">
        <div className="widget-chart p-3" style={{ height: "400px"}}>
          Coming soon.....
        </div>
      </div>
    </div>

  </div>
      {/* <Coupon/> */}
    </>
  );
}
