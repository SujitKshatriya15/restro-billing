import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import FoodGrid from "../components/FoodGrid";

const token = localStorage.getItem("token");
const BASE_URL = "https://restro-billing-yogurt-co.onrender.com";

function ManageMenu() {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const [selectedFood, setSelectedFood] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { tableNumber } = useParams();
  const token = localStorage.getItem("token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      const [categoriesRes, foodsRes, foodOptionsRes] = await Promise.all([
        fetch(`${BASE_URL}/categories`, { headers: authHeaders }),
        fetch(`${BASE_URL}/foods`, { headers: authHeaders }),
        fetch(`${BASE_URL}/food-options`, { headers: authHeaders }),
      ]);

      const [categoriesData, foodsData, foodOptionsData] = await Promise.all([
        categoriesRes.json(),
        foodsRes.json(),
        foodOptionsRes.json(),
      ]);

      setCategories(categoriesData);
      setFoods(foodsData);
      setFoodOptions(foodOptionsData);

      if (categoriesData.length > 0) {
        setSelectedCategory(categoriesData[0].category_id);
        setSelectedCategoryName(categoriesData[0].category_name);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // DERIVED STATE
  // =========================
  const filteredFoods = foods.filter(
    (food) => food.category_id === selectedCategory
  );

  // =========================
  // OPEN FOOD DETAILS MODAL
  // =========================
  const openFoodOptions = (food) => {
    setSelectedFood(food);
    setCurrentOptions(
      foodOptions.filter((opt) => opt.category_id === food.category_id)
    );
    setShowModal(true);
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="orders">
      <Navbar />

      <div className="main-layout">
        {/* CATEGORIES */}
        <CategoryGrid
          categories={categories}
          selectedCategoryName={selectedCategoryName}
          setSelectedCategory={setSelectedCategory}
          setSelectedCategoryName={setSelectedCategoryName}
        />

        {/* FOOD SECTION */}
        <div className="food-section">
          <h2 className="section-title">{selectedCategoryName}</h2>
          <FoodGrid
            filteredFoods={filteredFoods}
            openFoodOptions={openFoodOptions}
          />
        </div>
      </div>

      {/* FOOD DETAILS MODAL (inspect only) */}
      {showModal && selectedFood && (
        <div className="modal-overlay">
          <div className="food-modal">
            <h2>{selectedFood.food_name}</h2>
            <p className="food-price">₹{selectedFood.price}</p>

            {/* OPTIONS */}
            {currentOptions.length > 0 && (
              <div className="food-options">
                {currentOptions.map((option) => (
                  <div key={option.option_id} className="option-btn">
                    {option.option_name}
                    {option.extra_price > 0 && (
                      <span> (+₹{option.extra_price})</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <button className="close-btn" onClick={() => setShowModal(false)}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageMenu;