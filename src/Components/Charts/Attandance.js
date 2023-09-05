import React from 'react';
import Chart from 'react-apexcharts';

function EmployeeWorkHoursChart({ data }) {
  // Function to format the data for the chart
  const formatChartData = (data) => {
    return {
      options: {
        chart: {
          type: 'bar',
          stacked: true,
        },
        xaxis: {
          type: 'datetime', // Set the X-axis type to datetime
          categories: data.map((entry) => new Date(entry.date).getTime()), // Convert date strings to timestamps
          labels: {
            formatter: function (value) {
              // Format the date label as needed (e.g., 'Sep 01')
              const date = new Date(value);
              return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
            },
          },
        },
        yaxis: {
          title: {
            text: 'Hours',
          },
        },
        legend: {
          position: 'top',
        },
      },
      series: [
        {
          name: 'Regular Hours',
          data: data.map((entry) => entry.regularHours),
        },
        {
          name: 'Overtime Hours',
          data: data.map((entry) => entry.overtimeHours),
        },
        {
          name: 'Below Hours',
          data: data.map((entry) => entry.belowHours),
        },
      ],
    };
  };

  const chartData = formatChartData(data);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" height={350} />
    </div>
  );
}

export default EmployeeWorkHoursChart;

