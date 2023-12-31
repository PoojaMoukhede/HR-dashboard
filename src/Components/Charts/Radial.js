import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import ApexCharts from "react-apexcharts"

const RadialChart = () => {
  // Define the chart options
  const options = {
    series: [20, 40, 60],
          chart: {
          height: 390,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#27ceb8', '#63619b', '#f8b146'],
        labels: ['Pending', 'In-Progress', 'Completed'],
        legend: {
          show: true,
          floating: true,
          fontSize: '16px',
          position: 'left',
          offsetX: 160,
          offsetY: 15,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
                show: false
            }
          }
        }]
  };

  // Use useEffect to render the chart when the component mounts
  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, []);

  return (
    <div id="chart">
      {/* The chart will be rendered inside this div */}
      <Chart options={options} series={options.series} type="radialBar" height={390} />
    </div>
  );
};

export default RadialChart;
