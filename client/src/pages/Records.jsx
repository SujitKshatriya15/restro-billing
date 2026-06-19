import BillRecords from "../components/BillRecords";
import ItemSoldDetails from "../components/ItemSoldDetails";

function Records() {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-left">
        <Records />
      </div>
      <div className="dashboard-right">
        <ItemSoldDetails />
      </div>
    </div>
  );
}

export default Records;