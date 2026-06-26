import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"
import AddTable from "../components/addTable";
function Home() {
  const navigate = useNavigate();

  const [tables, setTables] = useState([]);
  const [show,setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState({});
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const fetchTables = async () => {
    try {
      const response = await fetch(
        "https://restro-billing-yogurt-co.onrender.com/tables"
        // "http://localhost:5001/tables"
        ,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            tableNumber,
          }),
        }
      );

      const data = await response.json();

      console.log("Tables:", data);

      setTables(data);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };
  
  const fetchTableTotalPrice = async () => {
    try {
      const response = await fetch(
        `https://restro-billing-yogurt-co.onrender.com/check-table-status`
        // `http://localhost:5001/check-table-status`
        ,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const data = await response.json();
      const priceMap = {};

      data.forEach(item => {
        priceMap[item.table_number] = item.total_cost;
      });

      setTotalPrice(priceMap);
      
      console.log("Total Price:", data);
    } catch (err) {
      console.error(
        `Error fetching total price `,
        err
      );
    }
  }
  const viewTable = () =>{
    setShowModal(true);
  }
  const openTable = (tableNumber) => {
    navigate(`/menu/${tableNumber}`);
  };

  useEffect(() => {
    fetchTables();
    fetchTableTotalPrice();
  }, []);

  const changeTheme = () =>{
    const style = document.createElement('style');
    style.type = 'text/css';
    
    // Add the CSS rules as a string
    style.innerHTML = 'body { filter: invert(100%); }';
    
    // Append the style to the document head
    document.head.appendChild(style);
  }

  return (
    <div className="orders">
      {/* Navbar */}

      <Navbar />

      {/* TOP TABLES */}

      <div className="cards-container">
        {tables
          .filter(
            (table) =>
              !String(
                table.table_number
              ).startsWith("P")
          )
          .map((table) => (
            <div
              key={table.table_number}
              onClick={() =>
                openTable(
                  table.table_number
                )
              }
              className={`card ${
                table.status === "AVAILABLE"
                  ? "available-card"
                  : "occupied-card"
              }`}
            >
              <h4>
                {totalPrice[table.table_number] !== undefined
                ? `₹${totalPrice[table.table_number]}`
                : table.table_number}
              </h4>
            </div>
          ))}
      </div>

      {/* Divider */}

      <div className="divider"></div>

      {/* PARCELS */}

      <div className="more-cards">
        {tables
          .filter((table) =>
            String(
              table.table_number
            ).startsWith("P")
          )
          
          .map((table) => (
            <div
              key={table.table_number}
              onClick={() =>
                openTable(
                  table.table_number
                )
              }
              className={`card ${
                table.status === "AVAILABLE"
                  ? "available-card"
                  : "occupied-card"
              }`}
            >
              <h4>
                {totalPrice[table.table_number] !== undefined
                ? `₹${totalPrice[table.table_number]}`
                : table.table_number}
              </h4>
            </div>
          ))
        }
        <button onClick={() => setShow(true)}>+</button>
        {show && <AddTable 
        show = {show}
        setShow = {setShow}/>}
      </div>
    </div>
  );
}

export default Home;

