import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import ReactApexChart from "react-apexcharts";
import Table from "../Table/Table";
import MapC from "../Map/MapC";
import Updates from "../Updates/Updates";
import axios from "axios";
import money from "../../Images/img/money-bag (2).png";
import user from "../../Images/img/candidate.png";
import fuelimg from "../../Images/img/gas-pump.png";
import coupon from "../../Images/img/coupon.png";
import hr from "../../Images/img/unauthorized-person.png";
import attandence from "../../Images/img/available.png";
import complaints from "../../Images/img/businessman.png";
import event from "../../Images/img/event.png";
import { Link } from "react-router-dom";

// { isDetailsRendered } this prop for sidebar
export default function Dashboard() {
  const [fuelData, setFuelData] = useState([]);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalExpanse, setTotalExpanse] = useState(0);
  const [currentMonthTotalExpense, setCurrentMonthTotalExpense] = useState(0);
  const [fuel, setFuel] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const attendanceResponse = await axios.get(
          "http://192.168.1.211:8080/departmentWise"
        );
        setAttendanceData(attendanceResponse.data);

        const userResponse = await axios.get("http://192.168.1.211:8080/Users");
        setUserData(userResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalEmployeesCount = userData.length;
    const presentCount = attendanceData.length;

    const attendancePercentageValue =
      totalEmployeesCount > 0 ? (presentCount / totalEmployeesCount) * 100 : 0;

    setAttendancePercentage(attendancePercentageValue.toFixed(2));
  }, [attendanceData, userData]);

  const [fuelChartData, setFuelChartData] = useState({
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
      grid: {
        // To remove grid lines, set show to false
        show: false,
      },
      colors: ["#33CC5C"],
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

  const [expenseschartData, setExpenseChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: "black",
            // colors: "rgba(224, 224, 224, 0.38)",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "black",
            // colors: "rgba(224, 224, 224, 0.38)",
          },
        },
      },
      grid: {
        // To remove grid lines, set show to false
        show: false,
      },
      colors: ["#33CC5C"],
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
      .get("http://192.168.1.211:8080/totalMonthlyExpenses")
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
        const expenses = data.map((entry) => entry.expenses);
        const currentMonth = new Date().getMonth() + 1; //current month (1-12)

        const currentMonthData = data.find(
          (entry) => monthOrder[entry.month] === currentMonth
        );

        if (currentMonthData) {
          setCurrentMonthTotalExpense(currentMonthData.expenses);
        } else {
          // Handle the case when there's no data for the current month
          setCurrentMonthTotalExpense(0);

          const previousMonth = currentMonth - 1 <= 0 ? 12 : currentMonth - 1;
          const previousMonthData = data.find(
            (entry) => monthOrder[entry.month] === previousMonth
          );
        }

        setExpenseChartData({
          ...fuelChartData,
          options: {
            ...fuelChartData.options,
            xaxis: {
              ...fuelChartData.options.xaxis,
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
      .catch((error) => console.error(error));
  }, []);

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
        const currentMonth = new Date().getMonth() + 1;

        const currentMonthData = data.find(
          (entry) => monthOrder[entry.month] === currentMonth
        );

        if (currentMonthData) {
          setFuelData(currentMonthData.liters);
        } else {
          setFuelData(0);
          const previousMonth = currentMonth - 1 <= 0 ? 12 : currentMonth - 1;
          const previousMonthData = data.find(
            (entry) => monthOrder[entry.month] === previousMonth
          );
        }

        setFuelChartData({
          ...fuelChartData,
          options: {
            ...fuelChartData.options,
            xaxis: {
              ...fuelChartData.options.xaxis,
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
  const [showExpenseChart, setShowExpenseChart] = useState(true);
  const handleExpenseButtonClick = () => {
    setShowExpenseChart(true);
    setActiveButton('expense');
  };

  const handleFuelButtonClick = () => {
    setShowExpenseChart(false);
    setActiveButton('fuel');
  };

  return (
    <>
      <div className={`App`}>
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">

              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <Link to='/employee'> 
                  <div className="mb-4 widget-content widget-content0 ">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Employees
                      </p>
                      <img src={user} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                  <Link to='/dashboard'>
                  <div className="mb-4 widget-content widget-content0 ">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Fuel Consumption
                      </p>
                      <div>
                        <img src={fuelimg} alt="" />
                      </div>
                    </div>

                  </div>
                  </Link>
                 
                </div>
                <div className="col-md-6 col-xl-3">
                <Link to='/expanse'>
                  <div className="mb-4 widget-content widget-content0">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Expense
                      </p>
                      <img src={money} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                <Link to='/canteen'>
                  <div className=" mb-4 widget-content widget-content0 ">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Canteen Overview
                      </p>
                      <img src={coupon} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 col-xl-3">
                <Link to='/hradmins'>
                  <div className="card11 mb-4 widget-content widget-content0 ">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        HR Admin
                      </p>
                      <img src={hr} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                <Link to='/attandance'>
                  <div className="card11 mb-3 widget-content widget-content0">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Attandance
                      </p>
                      <img src={attandence} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                <Link to='/complaint'>
                  <div className="card11 mb-3 widget-content widget-content0 ">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Complaints
                      </p>
                      <img src={complaints} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
                <div className="col-md-6 col-xl-3">
                <Link to='/calender'>
                  <div className="card11 mb-3 widget-content widget-content0 ">
                    <div class="overview_top">
                      <p style={{ fontSize: "1.7rem", color: "white" }}>
                        Calender
                      </p>
                      <img src={event} alt="" />
                    </div>
                  </div>
                  </Link>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header d-flex">
                      <div className="card-header-title col">
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Monthly Report
                      </div>
                      <div className="float-right" width="50%">
                        <button onClick={handleExpenseButtonClick} 
                          className={`btn btnchart mr-2 ${activeButton === 'expense' ? 'activebtn' : ''}`}
                        >
                          Expense
                        </button>
                        <button onClick={handleFuelButtonClick}
                       className={`btn btnchart ${activeButton === 'fuel' ? 'activebtn' : ''}`}
                        >
                          Fuel
                        </button>
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div style={{ height: "370px" }}>
                            {showExpenseChart ? (
                              <ReactApexChart
                                options={expenseschartData.options}
                                series={expenseschartData.series}
                                type="area"
                                height={350}
                              />
                            ) : (
                              <ReactApexChart
                                options={fuelChartData.options}
                                series={fuelChartData.series}
                                type="area"
                                height={350}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Updates />

              {/* <div className="row">
                <div className="col-md-12">
                  <div className="mb-3 card cardp">
                    <Table />
                  </div>
                </div>
              </div> */}

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
