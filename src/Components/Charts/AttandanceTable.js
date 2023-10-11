import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useAPI } from "../../Context";
import { useParams } from "react-router-dom";

export default function AttandanceTable() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  // const {attandanceData} = useAPI()
  // const UserAttandance =()=>{
  //   attandanceData(data)
  // }
  useEffect(() => {
    // UserAttandance(id)
    try {
      axios
        .get(`http://localhost:8080/attandance/${id}`)
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
      <div className="table-responsive" style={{ overflowY: "scroll" }}>
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
              const punchIn = new Date(datas.timestamp).toLocaleString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // after removing this or changing to false gives nan so keep it
                }
              );
              // const timerForPunchout = new Date(datas.timer)
              //   .toISOString()
              //   .slice(11, 19);
              // const punchOut = punchIn + timerForPunchout;
              // console.log(`punch Out ${punchOut}`);

              const timerForPunchout = new Date(datas.timer)
                .toISOString()
                .slice(11, 19);

              // Convert milliseconds
              const punchInMs = new Date(`1970-01-01T${punchIn}Z`).getTime();
              const punchOutMs = new Date(
                `1970-01-01T${timerForPunchout}Z`
              ).getTime();

              // total time in milliseconds
              const totalMs = punchOutMs + punchInMs;

              // Calculate total milliseconds
              var hours = Math.floor(totalMs / 3600000);
              var minutes = Math.floor((totalMs % 3600000) / 60000);
              var seconds = Math.floor((totalMs % 60000) / 1000);

              // const AM_PM = hours >=12 ? 'PM':"AM";
              // hours=hours%12;
              // hours = hours?hours:12;
              function formatAMPM() {
                var AM_PM = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                // seconds = seconds < 10 ? '0'+seconds : seconds;
                var strTime = hours + ':' + minutes + ':'  + seconds +" " + AM_PM;
                return strTime;
              }
              // console.log(formatAMPM(new Date()));
              
              return (
                <tr>
                  <td>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left flex2">
                          <div className="widget-heading">
                            {new Date(datas.timestamp).toLocaleString("en-US", {
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
                    {new Date(datas.timestamp).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="text-center text-muted">
                    {formatAMPM(new Date())}
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
