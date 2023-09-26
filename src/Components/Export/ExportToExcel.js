import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// import '../Reports.css'
import { Icon } from "@iconify/react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const ExportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // const exportToCSV = (apiData, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(apiData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  const exportToCSV = (apiData, fileName) => {
    const fieldsToExclude = ["_id","Emp_id"];
  
    // Filter the apiData to exclude the specified fields
    const filteredData = apiData.map((item) => {
      const filteredItem = { ...item };
      fieldsToExclude.forEach((field) => {
        delete filteredItem[field];
      });
      return filteredItem;
    });
  
    // Convert the filtered data to a CSV
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <OverlayTrigger
      key="tooltip"
      placement="top"
      overlay={<Tooltip id="tooltip">Export Data</Tooltip>}
    >
      <button
        onClick={(e) => exportToCSV(apiData, fileName)}
        className="btn"
        // data-toggle="tooltip" data-placement="top" title="Export Data"
        style={{
          padding: "10px",
          marginLeft: "0.5rem",
          color: "white",
          backgroundColor: "#00bcbe",
          height: "2.8rem",
          marginBottom: "0.5rem",
          borderRadius: "30px",
        }}
      >
        <Icon icon="uil:export" color="white" width="1.5rem" />
        {/* Export */}
      </button>
    </OverlayTrigger>
  );
};
