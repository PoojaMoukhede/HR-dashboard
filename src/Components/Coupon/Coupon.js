import React from "react";
import './coupon.css';

export default function Coupon() {
  return (
    <>
    <div className="container">
      <div class="layer-two">
        <div class="text">
          <h5 style={{fontWeight:"700", color:"#485D67"}}>LUNCH COUPON</h5>
          <div class="detail">
            <p className="rightText">Valid Till Tomarrow</p>
          </div>
          <button>BUY</button>
        </div>
      </div>
      </div>
    </>
  );
}
