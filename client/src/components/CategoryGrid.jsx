import React, {useState} from "react";

function CategoryGrid({categories,selectedCategoryName,setSelectedCategory, setSelectedCategoryName}){
    return(
        <div className="categories">
          {categories.map((category) => (
            <div
              key={category.category_id}
              className={`category ${
                selectedCategoryName === category.category_name
                  ? "active-category"
                  : ""
              }`}
              onClick={() => {
                setSelectedCategory(category.category_id);
                setSelectedCategoryName(category.category_name);
              }}
            >
              {category.category_name}
            </div>
          ))}
        </div>
    )
}

export default CategoryGrid;