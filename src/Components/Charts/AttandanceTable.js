import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function AttandanceTable() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(`http://192.168.1.211:8080/attandance/${id}`)
        .then((response) => {
          setData(response.data.message.Employee_attandance);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const isOvertime = (timer) => {
    return timer > 32400000; // 32400000 milliseconds is 9 hours
  };

  return (
    <>
      <div
        className="table-responsive"
        style={{ height: "370px", overflowY: "scroll" }}
      >
        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
          <thead>
            <tr>
              <th>DATE</th>
              <th className="text-center">Punch-In</th>
              <th className="text-center">Punch-Out</th>
              <th className="text-center">Hours</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((datas, index) => {
              const punchIn = new Date(datas.timestamp).toLocaleString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                }
              );

              const timerForPunchout = new Date(datas.timer)
                .toISOString()
                .slice(11, 19);
              const punchInMs = new Date(`1970-01-01T${punchIn}Z`).getTime();
              const punchOutMs = new Date(
                `1970-01-01T${timerForPunchout}Z`
              ).getTime();
              const totalMs = punchOutMs + punchInMs;
              var hours = Math.floor(totalMs / 3600000);
              var minutes = Math.floor((totalMs % 3600000) / 60000);
              var seconds = Math.floor((totalMs % 60000) / 1000);
              function formatAMPM() {
                var AM_PM = hours >= 12 ? "PM" : "AM";
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                var strTime =
                  hours + ":" + minutes + ":" + seconds + " " + AM_PM;
                return strTime;
              }
              const totalSeconds = Math.floor(datas.timer / 1000);
              const hours1 = Math.floor(totalSeconds / 3600);
              const minutes1 = Math.floor((totalSeconds % 3600) / 60);
              const seconds1 = totalSeconds % 60;
              const formattedTimer = `${hours1
                .toString()
                .padStart(2, "0")}:${minutes1
                .toString()
                .padStart(2, "0")}:${seconds1.toString().padStart(2, "0")}`;
              const timerValue = datas.timer;

              let status;
              let statusIcon;
              if (isOvertime(timerValue)) {
                const overtimeHours = parseInt( (timerValue - 32400000) / 3600000);
                const overtimeMinutes = parseInt((timerValue - 32400000) / 60000) % 60;
                status = `${overtimeHours}H:${overtimeMinutes}M`;

                // Choose icon based on the range
                if (timerValue < 9 * 3600000) {
                  statusIcon = (<Icon icon="bxs:down-arrow" color="#009bfc" />);
                } else if (timerValue >= 9 * 3600000 && timerValue <= 9 * 3600000 + 59 * 1000) {
                  statusIcon = ( <Icon icon="carbon:circle-filled" color="#fcb900" /> );
                } else {
                  statusIcon = <Icon icon="bxs:up-arrow" color="#009bfc" />;
                }
              } else {
                const belowTimeHours = Math.floor((32400000 - timerValue) / 3600000 );
                const belowTimeMinutes = Math.floor((timerValue / 60000) % 60);
                status = `${belowTimeHours}H:${belowTimeMinutes}M`;

                // Choose icon based on the range
                if (timerValue < 9 * 3600000) {
                  statusIcon = ( <Icon icon="bxs:down-arrow" color="#07c684" /> );
                } else if (timerValue >= 9 * 3600000 && timerValue <= 9 * 3600000 + 59 * 1000) {
                  statusIcon = ( <Icon icon="carbon:circle-filled" color="#fcb900" /> );
                } else {
                  statusIcon = (<Icon icon="bxs:up-arrow" color="#009bfc" /> );
                }
              }

              return (
                <tr key={datas.timestamp}>
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
                  <td className="text-center text-muted">{formattedTimer}</td>
                  <td className="text-center text-muted">
                    {status} {statusIcon}
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
