import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTable({ show, setShow }) {
  const [tableNumber, setTableNumber] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const addTable = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/add-extra-p",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableNumber,
          }),
        }
      );

      const data = await response.json();
      if(data.status === 409){
        alert('table already exists')
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to add table");
      }

      setShow(false);
      setTableNumber("");
      navigate(0);
    } catch (error) {
      console.log("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="food-modal">
        <form onSubmit={addTable}>
          <div className="login-field">
            <label htmlFor="tableNumber">Table Number</label>
            <input
              type="text"
              name="tableNumber"
              id="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : "Add"}
          </button>
        </form>

        <button
          className="close-btn"
          onClick={() => setShow(false)}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default AddTable;