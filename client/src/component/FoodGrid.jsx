import React from "react";

function FoodGrid({filteredFoods, openFoodOptions}) {
  {
    filteredFoods.map((food) => (
      <div
        className="food-card"
        key={food.food_id}
        onClick={() => openFoodOptions(food)}
      >
        <div className="food-content">
          <div className="title-price">
            <h3>{food.food_name}</h3>

            <span>₹{food.price}</span>
          </div>

          <div className="food-line"></div>

          <p className="food-para">{food.food_description}</p>
        </div>
      </div>
    ));
  }
}

export default FoodGrid;