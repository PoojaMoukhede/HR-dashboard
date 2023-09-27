import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import PolorChart from "../Components/PolorChart";
import { useAPI } from "../Context";
import { useEffect } from "react";
import axios from "axios";

export default function Expanse() {
  const { fuelExpanseGet } = useAPI();
  const [expanse, setExpanse] = useState([]);
  const chart1Labels = ["Food", "Water", "Fuel", "Hotel", "Transport"];
  const ExpanseGetData = () => {
    fuelExpanseGet(expanse);
    // console.log(expanse)
  };

  const [expData, setExpData] = useState([]);
  const [chartData,setChartData] = useState([]);
  const [currentMonthFuelExpensetotal, setCurrentMonthFuelExpensetotal] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/expanse/curr")
      .then((response) => {
        const moneyFromAPI = response.data[0].money;
        setCurrentMonthFuelExpensetotal(moneyFromAPI);
        console.log("Money from API:", moneyFromAPI);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
      // ExpanseGetData()
  }, []);

  // currentMonthFuelExpensetotal for expense calculations just for now
  const totalAmount = currentMonthFuelExpensetotal;
  const foodExpense = parseInt(totalAmount * 0.06);
  const waterExpense = parseInt(totalAmount * 0.005);
  const transportExpense = parseInt(totalAmount * 0.2);
  const hotelExpense = parseInt(totalAmount * 0.15);
  const fuelExpense =
    totalAmount -
    (foodExpense + waterExpense + transportExpense + hotelExpense);

  // console.log("Food Expense:", foodExpense);
  // console.log("Water Expense:", waterExpense);
  // console.log("Transport Expense:", transportExpense);
  // console.log("Hotel Expense:", hotelExpense);
  // console.log("Fuel Expense:", fuelExpense);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                <h2
                  className="text-center"
                  style={{ color: "rgba(13,27,62,.7)" }}
                >
                  Monthly Expanses
                </h2>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                  <div className="col mb-4">
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-vector/hand-drawn-fast-food-illustration_23-2149013384.jpg?w=360"
                        height="170rem"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">

                        <div className="row">
                          <div className="col-sm-6">
                            <h5 className="card-title">Food</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="card-text big">
                              {foodExpense} &#8377;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="card">
                      <img
                        src="data:image/png;base64,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"
                        height="170rem"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <h5 className="card-title">Water</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="card-text big">
                              {waterExpense} &#8377;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="card">
                      <img
                        src="https://thumbs.dreamstime.com/b/icon-petrol-pump-suitable-education-symbol-flat-style-simple-design-editable-design-template-vector-simple-illustration-icon-252404057.jpg"
                        height="170rem"
                        alt="..."
                      />
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <h5 className="card-title">Fuel</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="card-text big">
                              {fuelExpense} &#8377;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="card">
                      <img
                        src="data:image/png;base64,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"
                        height="170rem"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <h5 className="card-title">Hotel</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="card-text big">
                              {hotelExpense} &#8377;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col mb-4">
                    <div className="card">
                      <img
                        src="data:image/jpeg;base64,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"
                        height="170rem"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <h5 className="card-title">Transport</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="card-text big">
                              {transportExpense} &#8377;
                            </p>
                          </div>
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
                        <i className="header-icon lnr lnr-pie-chart icon-gradient bg-love-kiss">
                          {" "}
                        </i>
                        Monthly Expanse Report
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div style={{ height: "370px" }}>
                            <PolorChart
                              series={[foodExpense,waterExpense,fuelExpense,hotelExpense,transportExpense]}
                              labels={chart1Labels}
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
                        <i className="header-icon lnr lnr-pie-chart icon-gradient bg-love-kiss">
                          {" "}
                        </i>
                        Monthly Expanse Report Table
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="tabs-eg-77"
                        >
                          <div
                            className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                            style={{ height: "370px" }}
                          >
                            {/* <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="bar"
                            height={350}
                          /> */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div
                                  className="tab-pane fade show active"
                                  id="tabs-eg-77"
                                >
                                  <div
                                    className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0"
                                    style={{ height: "300px" }}
                                  >
                                    <div className="col-md-12 col-xl-12">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <p className="mb-0">Total Amount</p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="text-muted mb-0">
                                              {currentMonthFuelExpensetotal}{" "}
                                              &#8377;
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <p className="mb-0">
                                              Expanse On Food
                                            </p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="text-muted mb-0">
                                              {foodExpense} &#8377;
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <p className="mb-0">
                                              Expanse On Water Bottle
                                            </p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="text-muted mb-0">
                                              {waterExpense} &#8377;
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <p className="mb-0">
                                              Expanse On Fuel
                                            </p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="text-muted mb-0">
                                              {fuelExpense} &#8377;
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <p className="mb-0">Hotel Bills</p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="text-muted mb-0">
                                              {hotelExpense} &#8377;
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                          <div className="col-sm-6">
                                            <p className="mb-0">
                                              Transportation (Other Vehical)
                                            </p>
                                          </div>
                                          <div className="col-sm-6">
                                            <p className="text-muted mb-0">
                                              {transportExpense} &#8377;
                                            </p>
                                          </div>
                                        </div>
                                        <hr />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
