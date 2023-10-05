import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AttandanceTable() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    try {
      axios
        .get(`https://dashboardbackend-production-9839.up.railway.app/attandance/${id}`)
        .then((response) => {
          // console.log(`response : ${response}`);
          setData(response.data.message.Employee_attandance);
          // console.log("Attendance:", response.data.message.Employee_attandance);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
          <thead>
            <tr>
              <th>DATE</th>
              <th className="text-center">Punch-In </th>
              <th className="text-center">Punch-Out</th>
              <th className="text-center">Hours</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas) => {
              // const punchIn = new Date(datas.timestamp).toLocaleString(
              //   "en-US",
              //   {
              //     hour: "2-digit",
              //     minute: "2-digit",
              //     second: "2-digit",
              //   }
              // );
              // const punchOut = new Date(datas.timer)
              //   .toISOString()
              //   .slice(11, 19);
              // const total_time = punchIn + punchOut;
              // console.log(`total_time ${total_time}`)

              return (
                <tr>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">
                            {new Date(datas.punch_in).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center text-muted">
                    {/* {new Date(datas.punch_in).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })} */}
                    {new Date(datas.punch_in).toLocaleString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                      hour12:true,
                                    }
                                  )}
                  </td>
                  <td className="text-center text-muted">
                  
                    {/* {total_time} */}
                    {new Date(datas.punch_out).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="text-center text-muted">
                    {new Date(datas.timer).toISOString().slice(11, 19)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
