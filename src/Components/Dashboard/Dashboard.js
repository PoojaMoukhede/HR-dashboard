import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ReactApexChart from "react-apexcharts";
import Table from "../Table/Table";
import MapC from "../Map/MapC";
import Updates from "../Updates/Updates";
import { ThemeContext } from "../Header/ThemeProvider";
import axios from "axios";

export default function Dashboard() {
  const [fuelData, setFuelData] = useState([]);
  const [cumulativeFuelConsumption, setCumulativeFuelConsumption] = useState([]);
  const [currentMonthFuelExpense, setCurrentMonthFuelExpense] = useState(0)
  const [currentMonthFuel, setCurrentMonthFuel] = useState(0);
  const [lastMonthFuelExpense, setLastMonthFuelExpense] = useState(0);
  const [totalDistance, setTotalDistance] = useState(null)
  const [totalExpanse,setTotalExpanse] = useState(0)
  const [currentMonthTotalExpense, setCurrentMonthTotalExpense] = useState(0);

  const chartData2 = {
    options: {
      chart: {
        id: "basic-bar2",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      colors: ["#22437e"],
      tooltip: {
        style: {
          colors: "#fd929d",
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Fuel Consumption in liters",
        data: fuelData.map((entry) => entry.Liters),
      },
    ],
  };


  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      colors: ["#2b5161"],
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Expenses in INR",
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios
      .get('http://localhost:8080/totalMonthlyExpenses')
      .then(response => {
        const data = response.data;

          const monthOrder = {
          January: 1,
          February: 2,
          March: 3,
          April: 4,
          May: 5,
          June: 6,
          July: 7,
          August: 8,
          September: 9,
          October: 10,
          November: 11,
          December: 12,
        };
  
        data.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
  
        const months = data.map(entry => entry.month);
        const expenses = data.map(entry => entry.expenses);
        const currentMonth = new Date().getMonth() + 1; //current month (1-12)

        const currentMonthData = data.find(entry => monthOrder[entry.month] === currentMonth);
        setCurrentMonthTotalExpense(currentMonthData.expenses);
    
        setChartData({
          ...chartData,
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: months,
            },
          },
          series: [
            {
              name: "Expenses in INR",
              data: expenses,
            },
          ],
        });
  
      
      })
      .catch(error => console.error(error));
  }, []);
  
  
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    axios
      .get("http://localhost:8080/fuel")
      .then((response) => {
        setFuelData(response.data);
        // console.log(response.data);
  
        // Calculate the cumulative fuel consumption, current month's expense, and last month's expense
        let cumulativeTotal = 0;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const lastMonth = (currentMonth - 1 + 12) % 12; // Calculate the previous month
        // console.log(`lastMonth ${lastMonth}`);
        response.data.forEach((entry) => {
          cumulativeTotal += entry.Liters;
          const entryDate = new Date(entry.Date);
          const entryMonth = entryDate.getMonth();
          const entryYear = entryDate.getFullYear();
  
          if (entryMonth === currentMonth && entryYear === currentYear) {
            setCurrentMonthFuelExpense(
              (prevExpense) => prevExpense + entry.Liters
            );
          }
  
          if (entryMonth === lastMonth && entryYear === currentYear) {
            setLastMonthFuelExpense(
              (prevExpense) => prevExpense + entry.Liters
            );
          }
        });
  
        setCumulativeFuelConsumption(cumulativeTotal);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

      axios
      .get("http://localhost:8080/fuel/curr")
      .then((response) => {
        const Liters = response.data[0].Liters;
        setCurrentMonthFuel(Liters);
        console.log("Liters from API:", Liters);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
     
  }, []);
  

useEffect(()=>{
  axios
  .get("http://localhost:8080/total-distance")
  .then((response) => {
    setTotalDistance(response.data.totalDistance);
    // console.log(`total-distance : ${response.data.totalDistance}`);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  axios
  .get("http://localhost:8080/totalExpenses")
  .then((response) => {
    setTotalExpanse(response.data.totalExpenses);
    
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

},[])






  return (
    <>
      <div className={`App ${theme}`}>
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <div className="col-md-6 col-xl-4">
                  <div className="mb-3 widget-content bg-plum-plate">
                    <div className="widget-content-wrapper text-white">
                      <div className="widget-content-left">
                        <div className="widget-heading">Attandance</div>
                        <div className="widget-subheading">
                          Till Last month attandance
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>98%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="mb-3 widget-content bg-night-sky">
                    <div className="widget-content-wrapper text-white">
                      <div className="widget-content-left">
                        <div className="widget-heading">Fuel Consumption</div>
                        <div className="widget-subheading">
                         Last month fuel consumption
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>{currentMonthFuel} Liters</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className=" mb-3 widget-content bg-asteroid">
                    <div className="widget-content-wrapper text-white">
                      <div className="widget-content-left">
                        <div className="widget-heading">Expenses</div>
                        <div className="widget-subheading">
                          This month expense
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>
                            {" "}
                            {currentMonthTotalExpense} &#8377;
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-3 widget-content ">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Total Distance Covered
                        </div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{totalDistance} KM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-3 widget-content">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">
                          Total Fuel Consumption
                        </div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{cumulativeFuelConsumption} Liters</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card11 mb-3 widget-content ">
                    <div className="widget-content-wrapper text-black">
                      <div className="widget-content-left">
                        <div className="widget-heading">Total Expenses</div>
                        <div className="widget-subheading">Till this month</div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-black">
                          <span>{totalExpanse} &#8377;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Monthly Fuel Consumption Report
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div style={{ height: "370px" }}>
                            <ReactApexChart
                              options={chartData2.options}
                              series={chartData2.series}
                              type="bar"
                              height={350}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header-tab-animation card-header">
                      <div className="card-header-title">
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-asteroid">
                          {" "}
                        </i>
                        Monthly Expense Report
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="tabs-eg-77"
                        >
                          <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                            <ReactApexChart
                             options={chartData.options} 
                             series={chartData.series}
                              type="bar"
                              height={350}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Updates />
              
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3 card cardp">
                    <Table />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3 card">
                    <MapC />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
