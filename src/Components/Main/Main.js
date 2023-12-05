import React from "react";
import Header from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";

export default function Main() {
  return (
    <>
      <div className="app-container  body-tabs-shadow fixed-sidebar fixed-header">
        <Header />
        <Dashboard />
      </div>
    </>
  );
}
