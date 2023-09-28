import React, { useState, useEffect } from "react";
import Coupon from "../Components/Coupon/Coupon";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import axios from "axios";
import food from "../Images/lai-yuching-WxePxgrIJbQ-unsplash (1).jpg";
import food2 from "../Images/zoshua-colah-dncjnYtmWHo-unsplash (1).jpg";

export default function CanteenFacility() {
  const [menuItems, setMenuItems] = useState({ today: null, tomorrow: null });

  useEffect(() => {
    axios
      .get("http://localhost:8080/menu")
      .then((response) => {
        setMenuItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="row">
                {/* content */}
                {/* <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        Today's Menu
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div style={{ height: "370px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-md-12 col-lg-6">
                  <div className="mb-3 card">
                    <div className="card-header-tab card-header">
                      <div className="card-header-title">
                        <i className="header-icon lnr lnr-chart-bars icon-gradient bg-night-sky">
                          {" "}
                        </i>
                        tomarrow's menu
                      </div>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade active show" id="tab-eg-55">
                        <div className="widget-chart p-3">
                          <div style={{ height: "370px" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}


                <div className="col-md-12 col-lg-6">
                  {menuItems.today && (
                    <div className="menu-card">
                      <div class="meal">
                        <img src={food} class="meal-img" alt="Salad"  />
                        <div class="meal-content p-0">
                          <h3>Today's Meal</h3>
                          <p>{menuItems.today.menu}</p>
                          {/* <p>Date: {menuItems.today.date.toString()}</p> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6">
                  {menuItems.tomorrow && (
                    <div className="menu-card">
                      <div class="meal">
                        <img src={food2} class="meal-img" alt="Salad" />

                        <div class="meal-content p-0">
                        <h3>Tomarrow's Meal</h3>
                          <p>{menuItems.tomorrow.menu}</p>
                          {/* <p>Date: {menuItems.today.date.toString()}</p> */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
