import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';


function PolorChart({series,labels}) {
// console.log(`labels : ${labels}`);

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
        // shadeTo: 'dark',

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
