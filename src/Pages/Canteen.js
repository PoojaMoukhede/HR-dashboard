import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Canteen() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState({ today: null, tomorrow: null });
  const [couponCounts, setCouponCounts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/menu")
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:8080/coupon-count-by-menu")
      .then((response) => {
        setCouponCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching coupon counts:", error);
      });
  }, []);

  const getCouponCountForMenu = (menuId) => {
    const couponCount = couponCounts.find((count) => count._id === menuId);
    return couponCount ? couponCount.totalCoupons : 0;
  };
  return (
    <>
      {" "}
      <div className="mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title">
            <i className="header-icon lnr lnr-dinner icon-gradient bg-asteroid">
              {" "}
            </i>
            Canteen Overview
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane fade active show" id="tab-eg-55">
            <div className="widget-chart p-3" style={{ height: "400px" }}>
              <div className="row">
                <div className="col-xl-12 col-md-12">
                  {menuItems.today && (
                    <div className="card overflow-hidden">
                      <div className="card-content">
                        <div className="card-body cleartfix">
                          <div
                            className="media align-items-stretch"
                            style={{ color: "rgba(13,27,62,.7)" }}
                          >
                            <div class="align-self-center mr-2">
                              <Icon
                                icon="ion:fast-food-outline"
                                style={{
                                  fontSize: "2rem",
                                  color: "#e6ebf7",

                                }}
                              />
                            </div>
                            <div className="media-body">
                              <h4 style={{ fontSize: "1.2rem" }}>
                                Todays's Menu
                              </h4>
                              <span
                                style={{ color: "#758099", fontSize: "0.9rem" }}
                              >
                                {menuItems.today.menu}
                              </span>
                            </div>
                            <div className="align-self-center">
                              <h1>
                                {getCouponCountForMenu(menuItems.today._id)}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div class="col-xl-12 col-md-12">
                  {menuItems.tomorrow && (
                    <div class="card overflow-hidden">
                      <div class="card-content">
                        <div class="card-body cleartfix">
                          <div
                            class="media align-items-stretch"
                            style={{ color: "rgba(13,27,62,.7)" }}
                          >
                            <div class="align-self-center mr-2">
                              <Icon
                                icon="ion:fast-food-outline"
                                style={{
                                  fontSize: "2rem",
                                  color: "#e6ebf7",

                                }}
                              />
                            </div>
                            <div class="media-body">
                              <h4 style={{ fontSize: "1.2rem" }}>
                                Tomorrow's Menu
                              </h4>
                              <span
                                style={{ color: "#758099", fontSize: "0.9rem" }}
                              >
                                {menuItems.tomorrow.menu}
                              </span>
                            </div>
                            <div class="align-self-center">
                              <h1>
                                {getCouponCountForMenu(menuItems.tomorrow._id)}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary float-right"
                style={{ width: "8rem" }}
                onClick={() => {
                  navigate("/canteen");
                }}
              >
                View{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Coupon/> */}
    </>
  );
}
