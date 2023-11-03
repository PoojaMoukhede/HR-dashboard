import React from "react";
import map from "../../Images/World tour (2).png";

export default function MapC() {
  return (
    <>
      <div className="card-header-tab card-header">
        <div className="card-header-title">
          <i className="header-icon lnr lnr-map-marker icon-gradient bg-asteroid">
            {" "}
          </i>
          Active Employees Location 
        </div>
      </div>
      {/* <img src={map} alt="" height="900px" /> */}
    <iframe src="https://maps.google.com/maps?q=ahmedabad&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" style={{width:" 100%", height: "800px"}}></iframe>
    {/* <iframe
  src="https://maps.google.com/maps?q=ahmedabad&amp;t=k&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
  frameborder="0"
  scrolling="no"
  style={{
    width: "100%",
    height: "800px",
    background: "black",
  }}
></iframe> */}
    </>
  );
}
