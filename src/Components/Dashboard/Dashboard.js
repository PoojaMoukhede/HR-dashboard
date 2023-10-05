import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { chartData } from "../Data";
import ReactApexChart from "react-apexcharts";
import Table from "../Table/Table";
import MapC from "../Map/MapC";
import Updates from "../Updates/Updates";
import { ThemeContext } from "../Header/ThemeProvider";
import Canteen from "../../Pages/Canteen";
import axios from "axios";

export default function Dashboard() {
  const [fuelData, setFuelData] = useState([]);
  const [expData, setExpData] = useState([]);
  const [cumulativeFuelConsumption, setCumulativeFuelConsumption] = useState(
    []
  );
  const [currentMonthFuelExpense, setCurrentMonthFuelExpense] = useState(0);
  const [currentMonthFuel, setCurrentMonthFuel] = useState(0);
  const [currentMonthFuelExpensetotal, setCurrentMonthFuelExpensetotal] =
    useState(0);
    const [currentMonthFuelExpensetotal2, setCurrentMonthFuelExpensetotal2] =
    useState(0);
  const [lastMonthFuelExpense, setLastMonthFuelExpense] = useState(0);
  const [
    cumulativeTotalPrevMonthExpanse,
    setCumulativeFuelConsumptionPrevMonthExpanse,
  ] = useState(0);
  const [
    cumulativeTotalThisMonthExpanse,
    setCumulativeFuelConsumptionThisMonthExpanse,
  ] = useState(0);


  // const monthlyLiters = new Array(12).fill(0);
  // fuelData.forEach((entry) => {
  //   const date = new Date(entry.month);
  //   const month = date.getMonth();
  //   console.log(month)
  //   monthlyLiters[month] += entry.Liters;
  // });
  

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

  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
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
          // expData.map((entry) => entry.month)
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
      colors: ["#2b5161"],
      dataLabels: {
        // Add this section to hide data labels on bars
        enabled: false,
      },
    },

    series: [
      {
        name: "Expenses in INR",
        data: expData.map((entry) => entry.money),
      },
    ],
  };

  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    axios
      .get("https://dashboardbackend-production-9839.up.railway.app/fuel")
      .then((response) => {
        setFuelData(response.data);
        console.log(response.data);
  
        // Calculate the cumulative fuel consumption, current month's expense, and last month's expense
        let cumulativeTotal = 0;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const lastMonth = (currentMonth - 1 + 12) % 12; // Calculate the previous month
        console.log(`lastMonth ${lastMonth}`);
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
      .get("https://dashboardbackend-production-9839.up.railway.app/expanse/curr")
      .then((response) => {
        const moneyFromAPI = response.data[0].money;
        setCurrentMonthFuelExpensetotal2(moneyFromAPI);
        console.log("Money from API:", moneyFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

      axios
      .get("https://dashboardbackend-production-9839.up.railway.app/fuel/curr")
      .then((response) => {
        const Liters = response.data[0].Liters;
        setCurrentMonthFuel(Liters);
        console.log("Liters from API:", Liters);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
     
  }, []);
  
  // useEffect(() => {
  //   axios
  //     .get('https://dashboardbackend-production-9839.up.railway.app/fuel')
  //     .then((response) => {
  //       setFuelData(response.data);
  //       console.log(response.data);

  //       // Calculate the cumulative fuel consumption up to the previous month
  //       // and the cumulative fuel consumption up to the current month
  //       const currentDate = new Date();
  //       const currentMonth = currentDate.getMonth();

  //       let cumulativeTotalPrevMonth = 0;
  //       let cumulativeTotalThisMonth = 0;

  //       response.data.forEach((entry) => {
  //         const entryDate = new Date(entry.Date);
  //         const entryMonth = entryDate.getMonth();

  //         if (entryMonth < currentMonth) {
  //           cumulativeTotalPrevMonth += entry.Liters;
  //         }

  //         if (entryMonth <= currentMonth) {
  //           cumulativeTotalThisMonth += entry.Liters;
  //         }
  //       });

  //       setCumulativeFuelConsumptionPrevMonth(cumulativeTotalPrevMonth);
  //       setCumulativeFuelConsumptionThisMonth(cumulativeTotalThisMonth);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  //-----------
  // useEffect(() => {
  //   axios
  //   .get('https://dashboardbackend-production-9839.up.railway.app/expanse')
  //   .then((response) => {
  //     setExpData(response.data);
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, []);

  // useEffect(() => {
  //   chartData.series[0].data = expData;
  // }, [expData])
  useEffect(() => {
    axios
      .get("https://dashboardbackend-production-9839.up.railway.app/expanse")
      .then((response) => {
        
        setExpData(response.data);
        console.log(response.data);

        let cumulativeTotalExpanse = 0;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const lastMonth = (currentMonth - 1 + 12) % 12;

        response.data.forEach((entry) => {
          cumulativeTotalExpanse += entry.money;
          const entryDate = new Date(entry.Date);
          const entryMonth = entryDate.getMonth();

          if (entryMonth === currentMonth) {
            setCumulativeFuelConsumptionThisMonthExpanse(
              (prevExpense) => prevExpense + entry.money
            );
          }

          if (entryMonth === lastMonth) {
            setCumulativeFuelConsumptionPrevMonthExpanse(
              (prevExpense) => prevExpense + entry.money
            );
          }
        });

        setCurrentMonthFuelExpensetotal(cumulativeTotalExpanse);
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
              {/* <div className="header-toggle-buttons">
            <button onClick={() => toggleTheme()}>{theme}</button>
          </div> */}
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
                          {/* <span> {lastMonthFuelExpense} Liters</span> */}
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
                            {currentMonthFuelExpensetotal2} &#8377;
                          </span>
                          {/* <span>48752</span> &#8377; */}
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
                          <span>1082 KM</span>
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
                          {/* <span>1,78072 &#8377;</span> */}
                          <span>{currentMonthFuelExpensetotal} &#8377;</span>
                          {/* cumulativeTotalExpanse */}
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
                              // options={chartData2.options}
                              // series={chartData2.series}
                              // type="bar"
                              // height={350}
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
              {/* <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header">
                    <i className="header-icon lnr lnr-pie-chart icon-gradient bg-love-kiss">
                      {" "}
                    </i>
                    <div className="card-header-title">Complaint Overview</div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade active show" id="tab-eg-55">
                      <div className="widget-chart p-3 d-flex ">
                        <div
                          style={{ width: "50%" }}
                          className="d-flex flex-column"
                        >
                          <ComplaintD />
                        </div>

                        <div className="col-md-12 col-xl-4">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
              <div className="row">
                {/* <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Complaint Overview
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div
                            className="d-flex"
                            style={{
                              height: "80px",
                              justifyContent: "space-around",
                              textAlign: "center",
                            }}
                          >
                            <div>
                              <h5>Total</h5>
                              <h4>12</h4>
                            </div>

                            <div>
                              <h5>Pending</h5>
                              <h4>02</h4>
                              <div
                                className="square"
                                style={{ backgroundColor: "#27ceb8" }}
                              ></div>
                            </div>

                            <div>
                              <h5>In Progress</h5>
                              <h4>04</h4>
                              <div
                                className="square"
                                style={{ backgroundColor: "#63619b" }}
                              ></div>
                            </div>

                            <div>
                              <h5>Completed</h5>
                              <h4>06</h4>
                              <div
                                className="square"
                                style={{ backgroundColor: "#f8b146" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-md-12 col-lg-6">
                <div className="mb-3 card">
                  <div className="card-header-tab card-header-tab-animation card-header">
                    <div className="card-header-title">
                      <i className="header-icon lnr lnr-chart-bars icon-gradient bg-asteroid">
                        {" "}
                      </i>
                      Complaint Overview
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="tabs-eg-77"
                      >
                        <div
                          style={{ height: "80px" }}
                          className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                        >
                          <div className="progress"  data-placement="top" title="Pending Complaints">
                            <div
                            
                              className="progress-bar"
                              role="progressbar"
                              style={{width: "25%",backgroundColor: "#27ceb8" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>

                          <div className="progress"   data-placement="top" title="In-Progress Complaints">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{width: "50%",backgroundColor: "#63619b" }}
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>

                          <div className="progress"   data-placement="top" title="Solved Complaints">
                            <div
                              className="progress-bar "
                              role="progressbar"
                              style={{width: "75%",backgroundColor: "#f8b146" }}
                              aria-valuenow="75"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>

              {/* <div className="row">
              <div className="col-md-12">
                <div className="mb-3 card">
                 <Canteen/>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
