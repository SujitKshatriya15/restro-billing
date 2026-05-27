import React, { useState } from "react";
import { Menu } from "lucide-react";
import {useNavigate} from "react-router-dom";


function Current() {
  const navigate = useNavigate();
  // const openMenu = {

  // }

  return (
    <div className="orders">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <Menu size={28} className="menu-icon" />
          <h1>THE MOMO HUB</h1>
        </div>

        <button 
        className="order-btn"
        onClick={()=> navigate("/")}>NEW ORDER</button>
      </nav>

      {/* Main Section */}
      <div className="cards-container">
        <div className="card" onClick={() => navigate("/menu")}>1</div>
        <div className="card" onClick={() => navigate("/menu")}>2</div>
        <div className="card" onClick={() => navigate("/menu")}>3</div>
        <div className="card" onClick={() => navigate("/menu")}>4</div>
      </div>
      {/* Divider */}
        <div className="divider"></div>

        {/* More Cards */}
        <div className="more-cards">
        <div className="card" onClick={()=> openMenu(table)}></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        <div className="card"></div>
        </div>
    </div>
  );
}

export default Current;