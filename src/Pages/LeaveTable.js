import React from "react";

export default function LeaveTable() {
  return (
    <>
    
      <div className="table-responsive">
        <table
          className="align-middle mb-0 table table-borderless table-striped table-hover"
          style={{ fontSize: "0.9rem" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th className="text-center">Days</th>
              <th className="text-center">Type</th>
              <th className="text-center">Applied For</th>
              <th className="text-center">Applied On</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="widget-content p-0">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left flex2">
                      <div className="widget-heading">Employee Name</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">02</td>
              <td className="text-center">Paid</td>
              <td className="text-center">Sick Leave</td>
              <td className="text-center">2023/09/11</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
