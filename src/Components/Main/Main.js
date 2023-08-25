import React from "react";
// import "./Main.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../Dashboard/Dashboard";

export default function Main() {
  return (
    <>
      <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        {/* <Sidebar /> */}
        <Dashboard />
      </div>
    </>
  );
}
