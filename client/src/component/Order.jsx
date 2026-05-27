import React, { useState } from "react";
import { Menu } from "lucide-react";
import { categories, foods } from "../data";
import { useNavigate } from "react-router-dom";

function Order() {

  const [selectedCategory, setSelectedCategory] =
    useState("Momos");

  const [billItems, setBillItems] =
    useState([]);

  const [selectedFood, setSelectedFood] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [currentOptions, setCurrentOptions] =
    useState([]);
  const [addFoodOption, setAddFoodOption] = useState([]);

  const [tableNumber] = useState(1);
  const [selectedOptionBtn, setSelectedOptionBtn] = useState("");

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()
  
  // =========================
  // FILTER FOODS
  // =========================

  const filteredFoods = foods.filter(
    (food) =>
      food.category === selectedCategory
  );

  // =========================
  // OPEN FOOD OPTIONS
  // =========================

  const openFoodOptions = (food) => {

    setSelectedFood(food);
    setQuantity(1);
    const currentCategory =
      categories.find(
        (cat) =>
          cat.name === food.category
      );

    const options =
      currentCategory?.options || [];

    setCurrentOptions(options);
    setSelectedOptionBtn("");
    setShowModal(true);
  };

  // =========================
  // ADD FOOD WITH OPTION
  // =========================

  const addFoodWithType = (addFoodOption) => {
    const finalPrice = (
      (selectedFood.price + addFoodOption.extra) * quantity
    )

    const updatedFood = {

      ...selectedFood,

      selectedOption: addFoodOption.name,

      finalPrice,

      qty: quantity
    };

    setBillItems([
      ...billItems,
      updatedFood
    ]);

    setShowModal(false);
    setAddFoodOption("");
  };

  // =========================
  // TOTAL
  // =========================

  const totalPrice =
    billItems.reduce(
      (acc, item) =>
        acc +
        (
          item.finalPrice ||
          item.price
        ),
      0
    );

  return (

    <div className="orders">

      {/* =========================
          NAVBAR
      ========================= */}

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

        <button className="order-btn" onClick={()=> navigate("/")}>
          NEW ORDER
        </button>

      </nav>

      {/* =========================
          MAIN LAYOUT
      ========================= */}

      <div className="main-layout">

        {/* =========================
            LEFT CATEGORY PANEL
        ========================= */}

        <div className="categories">

          {categories.map((category) => (

            <div
              key={category.id}
              className={`category ${
                selectedCategory ===
                category.name
                  ? "active-category"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  category.name
                )
              }
            >

              {category.name}

            </div>

          ))}

        </div>

        {/* =========================
            FOOD SECTION
        ========================= */}

        <div className="food-section">

          <h2 className="section-title">
            {selectedCategory}
          </h2>

          <div className="food-grid">

            {filteredFoods.map((food) => (

              <div
                className="food-card"
                key={food.id}
                onClick={() =>
                  openFoodOptions(food)
                }
              >

                <div className="food-content">

                  <div className="title-price">

                    <h3>
                      {food.title}
                    </h3>

                    <span>
                      ₹{food.price}
                    </span>

                  </div>

                  <div className="food-line"></div>

                  <p className="food-para">
                    {food.para}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* =========================
            BILL SECTION
        ========================= */}

        <div className="bill-section">

          <h2 className="bill-title">
            TOTAL BILL
          </h2>

          {/* TOP */}

          <div className="bill-top">

            <div className="bill-info">

              <h3>
                TABLE NO :
                {" "}
                {tableNumber}
              </h3>

              <h3>
                PARCEL : NO
              </h3>

            </div>

            <div className="bill-name-transfer">

              <select className="transfer-select">

                <option>
                  TRANSFER
                </option>

                <option>
                  Table 2
                </option>

                <option>
                  Table 3
                </option>

              </select>

              <input
                type="text"
                placeholder="Customer Name"
                className="bill-input"
              />

            </div>

          </div>

          {/* DESCRIPTION */}

          <div className="description-box">

            <label>
              DESCRIPTION
            </label>

            <textarea
              placeholder="Optional description..."
              className="description-input"
            ></textarea>

          </div>

          {/* BILL TABLE */}

          <div className="bill-table">

            <div className="bill-table-head">

              <span>SR.</span>
              <span>NAME</span>
              <span>QTY</span>
              <span>PRICE</span>

            </div>

            <div className="bill-items">

              {billItems.map(
                (item, index) => (

                  <div
                    className="bill-row"
                    key={index}
                  >

                    <span>
                      {index + 1}
                    </span>

                    <span>

                      {item.title}

                      {item.selectedOption &&
                        ` (${item.selectedOption})`
                      }

                    </span>

                    <span>
                      {item.qty}
                    </span>

                    <span>

                      ₹
                      {
                        item.finalPrice ||
                        item.price
                      }

                    </span>

                  </div>

                )
              )}

            </div>

          </div>

          {/* TOTAL */}

          <div className="bill-total">

            <h3>
              TOTAL
            </h3>

            <h3>
              ₹{totalPrice}
            </h3>

          </div>

          {/* BUTTONS */}

          <div className="bill-buttons">

            <button>
              BILL & PRINT
            </button>

            <button>
              BILL
            </button>

            <button>
              KOT
            </button>

            <button>
              KOT & PRINT
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          FOOD OPTIONS MODAL
      ========================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="food-modal">

            <h2>
              {selectedFood.title}
            </h2>

            <div className="food-options">

            {currentOptions.map(
              (option, index) => (

                <button
                  key={index}

                  className={`option-btn ${
                    selectedOptionBtn === option.name
                      ? "active-option"
                      : ""
                  }`}

                  onClick={() => {

                    setSelectedOptionBtn(
                      option.name
                    );

                    setAddFoodOption(option);
                    
                  }}
                >

                  {option.name}
                  <br />
                  {option.extra > 0 &&
                    ` (+₹${option.extra})`
                  }

                </button>

              )
            )}

          </div>
            <div className="quantity-box">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
            >
              -
            </button>

            <span>
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>
            
            
            <button
              className="close-btn"
              onClick={() =>
                addFoodWithType(addFoodOption)
              }
            >

              ORDER

            </button>
            <button
              className="close-btn"
              onClick={() =>
                setShowModal(false)
              }
            >

              CLOSE

            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Order;