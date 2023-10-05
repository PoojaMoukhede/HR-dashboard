import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function TripDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(`https://dashboardbackend-production-9839.up.railway.app/attandance/${id}`)
        .then((response) => {
          // console.log(response)
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title">
                <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure">
                  {" "}
                </i>
                Employees Location / Trip Detail
              </div>
            </div>
            <div className="table-responsive">
              <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th className="text-center">Start Point</th>
                    <th className="text-center">End Point</th>
                    <th className="text-center">Expanse</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((datas) => {
                    return (
                      <tr>
                        <td>
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left flex2">
                                <div className="widget-heading">
                                  {}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-muted">
                          
                        </td>
                        <td className="text-center text-muted">{}</td>
                        <td className="text-center text-muted">
                          {}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
