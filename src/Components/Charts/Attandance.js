import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";

export default function AttandanceTable() {
  const [data, setData] = useState([]);
  const [displayCurrentMonth, setDisplayCurrentMonth] = useState(true);
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

  const regularHours = 9;

  const handleShowCurrentMonth = () => {
    setDisplayCurrentMonth(true);
  };

  const handleShowCompleteData = () => {
    setDisplayCurrentMonth(false);
  };

  const filteredData = displayCurrentMonth
    ? data.filter((datas) => {
        const date = new Date(datas.timestamp);
        const currentMonth = new Date().getMonth();
        return date.getMonth() === currentMonth;
      })
    : data;

  const attendanceData = filteredData.map((datas) => {
    const totalWorkingHours = parseInt(datas.timer / 3600000);
    const overtimeHours = Math.max(totalWorkingHours - regularHours, 0);
    const belowTimeHours = Math.max(regularHours - totalWorkingHours, 0);

    const isRegularTime = totalWorkingHours === regularHours;

    return {
      timestamp: datas.timestamp,
      overtimeHours: overtimeHours,
      belowTimeHours: belowTimeHours,
      regularHours: isRegularTime ? regularHours : 0,
    };
  });

  const chartData = {
    options: {
      chart: {
        type: "bar",
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: attendanceData.map((datas) => {
          const date = new Date(datas.timestamp);
          const month = date.toLocaleString("default", { month: "short" });
          const day = date.getDate();
          return `${day} ${month}`;
        }),
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      yaxis: {
        title: {
          text: "Hours",
        },
        labels: {
          style: {
            colors: "black",
          },
        },
      },
    },
    series: [
      {
        name: "Overtime Hours",
        data: attendanceData.map((datas) => datas.overtimeHours),
      },
      {
        name: "Below Time Hours",
        data: attendanceData.map((datas) => datas.belowTimeHours),
      },
      {
        name: "Regular Time Hours",
        data: attendanceData.map((datas) => datas.regularHours),
      },
    ],
  };

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header d-flex">
          <div className="card-header-title col">
            <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
              {" "}
            </i>
            Daily Attandance Report
          </div>
          <div className="float-right" width="50%">
            <button
              onClick={handleShowCurrentMonth}
              className="btn btn-outline-secondary mr-2"
            >
              This Month
            </button>
            <button
              onClick={handleShowCompleteData}
              className="btn btn-outline-secondary"
            >
              Complete
            </button>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade active show" id="tab-eg-55">
            <div className="widget-chart p-3">
              <div style={{ height: "450px" }}>
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="bar"
                  width="100%"
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Chart from "react-apexcharts";

// export default function AttandanceTable() {
//   const [data, setData] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     try {
//       axios
//         .get(`http://192.168.1.211:8080/attandance/${id}`)
//         .then((response) => {
//           setData(response.data.message.Employee_attandance);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     } catch (e) {
//       console.log(e);
//     }

//   }, []);

//   const regularHours = 9;

//   const attendanceData = data.map((datas) => {
//     const totalWorkingHours = parseInt(datas.timer / 3600000);
//     const overtimeHours = Math.max(totalWorkingHours - regularHours, 0);
//     const belowTimeHours = Math.max(regularHours - totalWorkingHours, 0);

//     const isRegularTime = totalWorkingHours === regularHours;

//     return {
//       timestamp: datas.timestamp,
//       overtimeHours: overtimeHours,
//       belowTimeHours: belowTimeHours,
//       regularHours: isRegularTime ? regularHours : 0,
//     };
//   });

//   // // Filter data for the current mont
//   // const currentMonthData = data.filter((datas) => {
//   //   const date = new Date(datas.timestamp);
//   //   const currentMonth = new Date().getMonth();
//   //   return date.getMonth() === currentMonth;
//   // });

//   // const attendanceData = currentMonthData.map((datas) => {
//   //   const totalWorkingHours = parseInt(datas.timer / 3600000);
//   //   const overtimeHours = Math.max(totalWorkingHours - regularHours, 0);
//   //   const belowTimeHours = Math.max(regularHours - totalWorkingHours, 0);

//   //   const isRegularTime = totalWorkingHours === regularHours;

//   //   return {
//   //     timestamp: datas.timestamp,
//   //     overtimeHours: overtimeHours,
//   //     belowTimeHours: belowTimeHours,
//   //     regularHours: isRegularTime ? regularHours : 0,
//   //   };
//   // });

//   const chartData = {
//     options: {
//       chart: {
//         type: "bar",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       xaxis: {
//         categories: attendanceData.map((datas) => {
//           const date = new Date(datas.timestamp);
//           const month = date.toLocaleString("default", { month: "short" });
//           const day = date.getDate();
//           return `${day} ${month}`;
//         }),
//         labels: {
//           style: {
//             colors: "black",
//             // colors: "rgba(224, 224, 224, 0.38)",
//           },
//         },
//       },
//       // grid: {
//       //   // To remove grid lines, set show to false
//       //   show: false,
//       // },
//       yaxis: {
//         title: {
//           text: "Hours",
//         },

//         labels: {
//           style: {
//             colors: "black",
//             // colors: "rgba(224, 224, 224, 0.38)",
//           },
//         },
//       },
//     },
//     series: [
//       {
//         name: "Overtime Hours",
//         data: attendanceData.map((datas) => datas.overtimeHours),
//       },
//       {
//         name: "Below Time Hours",
//         data: attendanceData.map((datas) => datas.belowTimeHours),
//       },
//       {
//         name: "Regular Time Hours",
//         data: attendanceData.map((datas) => datas.regularHours),
//       }
//     ],
//   };

//   return (
//     <Chart
//       options={chartData.options}
//       series={chartData.series}
//       type="bar"
//       width="100%"
//       height={350}
//     />
//   );
// }
