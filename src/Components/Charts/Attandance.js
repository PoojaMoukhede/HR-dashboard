// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function EmployeeWorkHoursChart() {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/attandance/${id}`)
//       .then((response) => {
//         const data = response.data.message.Employee_attandance;
//         console.log(`hethbhd :${data}`)
//         setAttendanceData(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [id]);

//   if (attendanceData === null) {
//     return <div>Loading...</div>;
//   }

//   const employeeAttendance = attendanceData.Employee_attandance || [];
//   console.log(`eeeeeeee :${employeeAttendance}`)
//   let totalWorkedHours = 32400000;

//   for (const entry of employeeAttendance) {
//     if (entry.action === 'Punch Out') {
//       totalWorkedHours += entry.timer ; 
//     }
//   }

//   // Calculate overtime and below-time hours
//   let overtimeHours = 0;
//   let belowTimeHours = 0;
//   if (totalWorkedHours > 32400000) {
//     overtimeHours = totalWorkedHours - 32400000;
//   } else if (totalWorkedHours < 32400000) {
//     belowTimeHours = 32400000 - totalWorkedHours;
//   }

// console.log(`below : ${belowTimeHours} ---- over : ${overtimeHours} ----- total : ${totalWorkedHours}`)

//   const chartData = {
//     options: {
//       chart: {
//         type: 'bar',
//         stacked: true,
//       },
//       // ... other options
//     },
//     series: [
//       {
//         name: 'Regular Hours',
//         data: [10], // Total worked hours
//       },
//       {
//         name: 'Overtime Hours',
//         data: [overtimeHours],
//       },
//       {
//         name: 'Below Hours',
//         data: [belowTimeHours],
//       },
//     ],
//   };

//   return (
//     <div>
//       <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" height={350} />
//     </div>
//   );
// }

// export default EmployeeWorkHoursChart;



import React from 'react';
import Chart from 'react-apexcharts';

function EmployeeWorkHoursChart({data}) {
  // Function to format the workHoursData for the chart
  

  const formatChartdata = (data) => {
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

  const chartdata = formatChartdata(data);

  return (
    <div>
      <Chart options={chartdata.options} series={chartdata.series} type="bar" width="100%" height={350} />
    </div>
  );
}

export default EmployeeWorkHoursChart;