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
  const [totalDistance, setTotalDistance] = useState(null)
  const [totalExpanse,setTotalExpanse] = useState(0)
  const [currentMonthTotalExpense, setCurrentMonthTotalExpense] = useState(0);
  const [fuel,setFuel] = useState(null)


  const [chartData2, setChartData2] = useState({
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
      colors: ["#224480"],
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: "Fuel in Liters",
        data: [],
      },
    ],
  });
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
      colors: ["#0f2128"],
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
      .get('http://192.168.1.211:8080/totalMonthlyExpenses')
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
      .get("http://192.168.1.211:8080/total-distance")
      .then((response) => {
        setTotalDistance(response.data.totalDistance);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    axios
      .get("http://192.168.1.211:8080/totalExpenses")
      .then((response) => {
        setTotalExpanse(response.data.totalExpenses);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    axios
      .get(`http://192.168.1.211:8080/totalFuel`)
      .then((response) => {
        const fuelCount = response.data.totalAllFuel;
        setFuel(fuelCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  
    axios
      .get(`http://192.168.1.211:8080/totalFuelByMonth`)
      .then((response) => {
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
  
        const months = data.map((entry) => entry.month);
        const Liters = data.map((entry) => entry.liters);
        const currentMonth = new Date().getMonth() + 1; // current month (1-12)
  
        const currentMonthData = data.find(
          (entry) => monthOrder[entry.month] === currentMonth
        );
        setFuelData(currentMonthData.liters);
  
        setChartData2({
          ...chartData2,
          options: {
            ...chartData2.options,
            xaxis: {
              ...chartData2.options.xaxis,
              categories: months,
            },
          },
          series: [
            {
              name: "Fuel in Liters",
              data: Liters,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
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
                         This month fuel consumption
                        </div>
                      </div>
                      <div className="widget-content-right">
                        <div className="widget-numbers text-white">
                          <span>{fuel} Liters</span>
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
                          <span>{fuelData} Liters</span>
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
