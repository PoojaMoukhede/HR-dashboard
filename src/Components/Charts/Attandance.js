import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";

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
  }, []);

  const regularHours = 9;

  const attendanceData = data.map((datas) => {
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
            // colors: "rgba(224, 224, 224, 0.38)",
          },
        },
      },
      // grid: {
      //   // To remove grid lines, set show to false
      //   show: false,
      // },
      yaxis: {
        title: {
          text: "Hours",
        },
        
        labels: {
          style: {
            colors: "black",
            // colors: "rgba(224, 224, 224, 0.38)",
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
      }
    ],
  };

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width="100%"
      height={350}
    />
  );
}
