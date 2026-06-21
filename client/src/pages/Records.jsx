import React from "react";
import BillRecords from "../components/BillRecords";
import ItemSoldDetails from "../components/ItemSoldDetails";
import Navbar from "../components/Navbar";
function Records() {
  return (
    <div>
      <Navbar />
    <div className="dashboard-layout">
      <div className="dashboard-left">
        <BillRecords />
      </div>
      <div className="dashboard-right">
        <ItemSoldDetails />
      </div>
    </div>
    </div>
  );
}

export default Records;