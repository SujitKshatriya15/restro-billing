import React from "react";
import { useNavigate } from "react-router-dom";
import {Menu} from "lucide-react";

function Navbar(){
    const navigate = useNavigate();
    return (
        <nav className="navbar">

        <div className="nav-left">

          <Menu
            size={28}
            className="menu-icon"
          />

          <h1>
            THE MOMO HUB
          </h1>

        </div>

        <button
          className="order-btn"
          onClick={() => navigate("/records")}
        >
          Bills History
        </button>
        <button
          className="order-btn"
          onClick={() =>
            navigate("/")
          }
        >

          NEW ORDER

        </button>

      </nav>
    )
}
export default Navbar;