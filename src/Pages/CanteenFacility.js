import React, { useState, useEffect } from "react";
import Coupon from "../Components/Coupon/Coupon";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import axios from "axios";
import food from "../Images/lai-yuching-WxePxgrIJbQ-unsplash (1).jpg";
import food2 from "../Images/zoshua-colah-dncjnYtmWHo-unsplash (1).jpg";
import AddCoupon from '../Components/Coupon/AddCoupon'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


export default function CanteenFacility() {
  const [menuItems, setMenuItems] = useState({ today: null, tomorrow: null });
  const [totalCouponCount, setCouponCount] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAdd = (newMenu) => {
    console.log("model open");
    setMenuItems((prevRows) => [...prevRows, newMenu]);
    console.log("model close");
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/menu")
      .then((response) => {
        setMenuItems(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    
        axios
          .get('http://localhost:8080/menu/total_coupon_count')
          .then((response) => {
            setCouponCount(response.data.totalCouponCount);
            // console.log(response.data.totalCouponCount)
          })
          .catch((error) => {
            console.error('Error fetching coupon count:', error);
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

            <div className="d-flex">
              
              <OverlayTrigger
                key="tooltip14"
                placement="top"
                overlay={<Tooltip id="tooltip">Add Menu</Tooltip>}
              >
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn mb-2 "
                  style={{ padding: "10px",border:' 2px solid #00c6f8',borderRadius:'5px'}}
                >ADD MENU
                </button>
              </OverlayTrigger>
            </div>
            <AddCoupon
            open = {isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAdd}
            />
        

              <div className="row">
               
                <div className="col-md-12 col-lg-6">
                  {menuItems.today && (
                    <div className="menu-card">
                      <div className="meal">
                        <img src={food} className="meal-img" alt="Salad" />
                        <div className="meal-content p-0">
                          <div className="text">
                            <h5 style={{ fontWeight: "700", color: "#485D67" }}>
                              LUNCH COUPON TODAY'S MEAL
                            </h5>
                            <div className="detail">
                              <ul className="menuItem">
                                {menuItems.today.menu
                                  .split(", ")
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                              </ul>
                              {/* <p className="menuItem">{menuItems.today.menu}</p> */}
                            </div>
                            <div className="d-flex">
                              <div style={{ width: "50%" }}>
                                <button>BOUGHT - {totalCouponCount}</button>
                              </div>
                              <div>
                                <p className="pt-2">Valid Till Tomarrow</p>
                              </div>
                            </div>
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
                        <img src={food2} className="meal-img" alt="Salad" />
                        <div className="meal-content p-0">
                          <div className="text">
                            <h5 style={{ fontWeight: "700", color: "#485D67" }}>
                              LUNCH COUPON TOMARROW'S MEAL
                            </h5>
                            <div className="detail">
                              <ul className="menuItem">
                                {menuItems.tomorrow.menu
                                  .split(", ")
                                  .map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                              </ul>
                              {/* <p className="menuItem">{menuItems.today.menu}</p> */}
                            </div>
                            <div className="d-flex">
                              <div style={{ width: "50%" }}>
                                <button>BOUGHT - 12</button>
                              </div>
                              <div>
                                {/* <p className="pt-2">Valid Till Tomarrow</p> */}
                              </div>
                            </div>
                          </div>
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
