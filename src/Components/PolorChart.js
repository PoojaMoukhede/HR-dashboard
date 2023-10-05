import React, { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

function PolorChart({series,labels}) {
//   const [chartData,setChartData] = useState([]);
//   useEffect(() => {
//     axios
//     .get("https://dashboardbackend-production-9839.up.railway.app/expanse")
//     .then((response) => {
//       const data = response.data; 
//       const series = data.map((item) => item.money);
//       const labels = data.map((item) => item.month);
//     console.log(`series ; ${series}  ------------- labels : ${labels}`);
//       setChartData({series,labels,});

//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
    
// }, []);
//   const [series, setSeries] = useState([42, 47, 52]);
  const [options] = useState({
    chart: {
      width: 380,
      type: 'polarArea',
    },
    labels:labels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.6,
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="polarArea" width={380} />
    </div>
  );
}

export default PolorChart;
