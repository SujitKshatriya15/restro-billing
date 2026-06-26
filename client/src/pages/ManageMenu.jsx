import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import CategoryGrid from "../components/CategoryGrid";
import FoodGrid from "../components/FoodGrid";

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

  // =========================
  // ADD ITEM FORM STATES
  // =========================
  const [formCategory, setFormCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  const [formOption, setFormOption] = useState("");
  const [newOptionName, setNewOptionName] = useState("");
  const [newOptionPrice, setNewOptionPrice] = useState("");

  const [formStatus, setFormStatus] = useState("");

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
  // ADD CATEGORY
  // =========================
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/add-category`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({ category_name: newCategoryName.trim() }),
      });
      const data = await res.json();
      if (res.status === 409) return setFormStatus("Category already exists.");
      if (!res.ok) return setFormStatus("Failed to add category.");
      setFormStatus("Category added!");
      setNewCategoryName("");
      setFormCategory("");
      await fetchData(); // refresh
    } catch (err) {
      setFormStatus("Server error.");
    }
  };

  // =========================
  // ADD FOOD
  // =========================
  const handleAddFood = async () => {
    const categoryId = formCategory === "add-new" ? null : formCategory;
    if (!foodName.trim() || !foodPrice || !categoryId) {
      return setFormStatus("Fill in food name, price and select a category.");
    }
    try {
      const res = await fetch(`${BASE_URL}/add-food`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          food_name: foodName.trim(),
          category_id: categoryId,
          price: parseFloat(foodPrice),
        }),
      });
      if (res.status === 409) return setFormStatus("Food already exists.");
      if (!res.ok) return setFormStatus("Failed to add food.");
      setFormStatus("Food added!");
      setFoodName("");
      setFoodPrice("");
      await fetchData();
    } catch (err) {
      setFormStatus("Server error.");
    }
  };

  // =========================
  // ADD OPTION
  // =========================
  const handleAddOption = async () => {
    if (!newOptionName.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/add-options`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          option_name: newOptionName.trim(),
          extra_price: parseFloat(newOptionPrice) || 0,
        }),
      });
      if (res.status === 409) return setFormStatus("Option already exists.");
      if (!res.ok) return setFormStatus("Failed to add option.");
      setFormStatus("Option added!");
      setNewOptionName("");
      setNewOptionPrice("");
      setFormOption("");
      await fetchData();
    } catch (err) {
      setFormStatus("Server error.");
    }
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

        {/* ADD ITEM FORM */}
        <div className="bill-section">
          <h3 className="section-title">Add Item</h3>

          {formStatus && (
            <p className="form-status">{formStatus}</p>
          )}

          {/* CATEGORY DROPDOWN */}
          <label>Select Category</label>
          <select
            className="customer-input"
            value={formCategory}
            onChange={(e) => {
              setFormCategory(e.target.value);
              setFormStatus("");
            }}
          >
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.category_name}
              </option>
            ))}
            <option value="add-new">+ Add New Category</option>
          </select>

          {/* NEW CATEGORY INPUT */}
          {formCategory === "add-new" && (
            <div className="inline-add">
              <input
                className="customer-input"
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button className="kot-btn" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
          )}

          {/* FOOD NAME + PRICE */}
          {formCategory && formCategory !== "add-new" && (
            <>
              <label>Food Name</label>
              <input
                className="customer-input"
                placeholder="Food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
              />

              <label>Price (₹)</label>
              <input
                className="customer-input"
                placeholder="Price"
                type="number"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
              />

              <button className="kot-btn" onClick={handleAddFood}>
                Add Food
              </button>
            </>
          )}

          <div className="divider" />

          {/* OPTIONS DROPDOWN */}
          <label>Select Option</label>
          <select
            className="customer-input"
            value={formOption}
            onChange={(e) => {
              setFormOption(e.target.value);
              setFormStatus("");
            }}
          >
            <option value="">-- Select --</option>
            {foodOptions.map((opt) => (
              <option key={opt.option_id} value={opt.option_id}>
                {opt.option_name}
                {opt.extra_price > 0 ? ` (+₹${opt.extra_price})` : ""}
              </option>
            ))}
            <option value="add-new">+ Add New Option</option>
          </select>

          {/* NEW OPTION INPUT */}
          {formOption === "add-new" && (
            <div className="inline-add">
              <input
                className="customer-input"
                placeholder="Option name"
                value={newOptionName}
                onChange={(e) => setNewOptionName(e.target.value)}
              />
              <input
                className="customer-input"
                placeholder="Extra price (₹)"
                type="number"
                value={newOptionPrice}
                onChange={(e) => setNewOptionPrice(e.target.value)}
              />
              <button className="kot-btn" onClick={handleAddOption}>
                Add Option
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOD DETAILS MODAL */}
      {showModal && selectedFood && (
        <div className="modal-overlay">
          <div className="food-modal">
            <h2>{selectedFood.food_name}</h2>

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