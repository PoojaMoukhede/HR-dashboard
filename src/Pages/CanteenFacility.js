import React, { useState, useEffect } from "react";
import Coupon from "../Components/Coupon/Coupon";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import axios from "axios";
import food from "../Images/jo-sonn-M-tzZD5z720-unsplash.png";
import food2 from "../Images/jaydeep-gajera-7yb08BMYhmQ-unsplash.png";
import AddCoupon from "../Components/Coupon/AddCoupon";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function CanteenFacility() {
  const [menuItems, setMenuItems] = useState({ today: null, tomorrow: null });
  const [couponCounts, setCouponCounts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (newMenu) => {
    // console.log("model open");
    setMenuItems((prevRows) => [...prevRows, newMenu]);
    // console.log("model close");
  };
  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/menu")
      .then((response) => {
        setMenuItems(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://192.168.1.211:8080/coupon-count-by-menu")
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
      <div className="app-container  body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <div className="app-main">
          <Sidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="d-flex container_btn">
                <OverlayTrigger
                  key="tooltip14"
                  placement="top"
                  overlay={<Tooltip id="tooltip">Add Menu</Tooltip>}
                >
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn mb-2"
                  >
                   <a>ADD MENU</a>
                  </button>
                </OverlayTrigger>
              </div>
              <AddCoupon
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAdd}
              />
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  {menuItems.today && (
                    <div className="menu-card">
                      <div className="meal">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width:'45%'
                          }}
                        >
                          <img
                            src={food}
                            className="meal-img"
                            alt="Salad"
                            width="90%"
                
                          />
                        </div>
                        <div className="meal-content p-0">
                          <div className="text">
                            <h5 style={{ fontWeight: "700", color: "#485D67" }}>
                              TODAY'S MEAL
                            </h5>
                            <div className="detail">
                              <ul className="menuItem">
                                {menuItems.today.menu
                                  .split(", ")
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                            <button>
                              BOUGHT -{" "}
                              {getCouponCountForMenu(menuItems.today._id)}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-md-12 col-lg-6">
                  {menuItems.tomorrow && (
                    <div className="menu-card">
                      <div className="meal">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            // marginLeft:'50px'
                            width:'45%'
                          }}
                        >
                          <img src={food2} className="meal-img" alt="Salad"  width="100%"/>
                        </div>
                        <div className="meal-content p-0">
                          <div className="text">
                            <h5 style={{ fontWeight: "700", color: "#485D67" }}>
                              TOMARROW'S MEAL
                            </h5>
                            <div className="detail">
                              <ul className="menuItem">
                                {menuItems.tomorrow.menu
                                  .split(", ")
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                              </ul>
                            </div>
                            <button>
                              BOUGHT -{" "}
                              {getCouponCountForMenu(menuItems.tomorrow._id)}
                            </button>
                          </div>
                          <div></div>
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
