import React from "react";
import map from "../../Images/World tour (2).png";

export default function MapC() {
  return (
    <>
      <div className="card-header-tab card-header">
        <div className="card-header-title">
          <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
            {" "}
          </i>
          Active Employees Location 
        </div>
      </div>
      <img src={map} alt="" height="900px" />
    </>
  );
}
