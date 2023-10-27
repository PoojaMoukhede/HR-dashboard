import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApexChart = () => {
  const { id } = useParams();
  const [remdays, setRemDays] = useState(null);
  const totalLeaveDays = 21;

  useEffect(() => {
    // Fetch leave data from your API
    axios
      .get(`http://192.168.1.211:8080/leave-balance/${id}`)
      .then((response) => {
        setRemDays(response.data.message.availableLeave);
        console.log(`totalLeave : ${response.data.message.availableLeave}`);
      })
      .catch((error) => {
        console.error("Error fetching clearance data:", error);
      });
  }, [id]);

  if (remdays === null) {
    return <div>Loading...</div>;
  }

  const remainingLeaveDays =  remdays;
  // const usedLeaveRatio = (remdays / totalLeaveDays) * 360;
  // const remainingLeaveRatio = (remainingLeaveDays / totalLeaveDays) * 360;
  // console.log(`used ${usedLeaveRatio} --- remaining :${remainingLeaveDays}`)

  const chartOptions = {
    chart: {
      height: 350,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135 , 
        endAngle: 215 , 
        hollow: {
          margin: 0,
          size: "50%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0,
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            formatter: function () {
              return parseInt(remainingLeaveDays); // Display remaining leave days
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Days"],
  };

  return (
    <div id="card">
      <div id="chart">
        <ReactApexChart
          options={chartOptions}
          series={[remainingLeaveDays]}
          type="radialBar"
          height={280}
        />
      </div>
  </div>
  );
};

export default ApexChart;
