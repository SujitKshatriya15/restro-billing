import React, { useEffect, useState } from "react";

function ItemSoldDetails() {
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalysis = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://restro-billing-yogurt-co.onrender.com/items-analysis");
      if (!response.ok) {
        throw new Error("Failed to load analysis data");
      }
      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      console.error("Analysis fetch error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };  

  const groupByDate = (data) => {
    const map = new Map();
    for (const category of data) {
      if (!map.has(category.date)) {
        map.set(category.date, []);
      }
      map.get(category.date).push(category);
    }
    return Array.from(map.entries()).map(([date, categories]) => ({
      date,
      categories,
    }));
  };

  if (loading) {
    return (
      <div className="analysis">
        <p className="analysis-loading">Loading analysis...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analysis">
        <p className="analysis-error">{error}</p>
      </div>
    );
  }
  const groupedData = groupByDate(analysisData).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  console.log(groupedData);

  return (
    <div className="analysis">
      <h2 className="analysis-title">Sales Analysis</h2>
      {groupedData.length === 0 ? (
        <p className="analysis-empty">No sales data found</p>
      ) : (
        <div className="analysis-list">
          {groupedData.map(({ date, categories }) => (
            <div key={date} className="analysis-date-group">
              <h3 className="analysis-date-header">{formatDate(date)}</h3>

              {categories.map((category) => {
                const categoryTotal = category.details.reduce(
                  (sum, item) => sum + item.sold,
                  0
                );
                return (
                  <div
                    key={`${category.category_id}-${category.date}`}
                    className="analysis-category"
                  >
                    <div className="analysis-category-header">
                      <span className="analysis-category-name">
                        {category.category_name}
                      </span>
                      <span className="analysis-category-total">
                        ₹{categoryTotal}
                      </span>
                    </div>
                    <div className="analysis-items">
                      {category.details.map((item) => (
                        <div
                          key={`${item.food_id}-${item.option_id}`}
                          className="analysis-item-row"
                        >
                          <div className="analysis-item-left">
                            <div className="analysis-item-name">
                              {item.food_name}
                            </div>
                            {item.option_name && (
                              <div className="analysis-item-option">
                                {item.option_name}
                              </div>
                            )}
                          </div>
                          <div className="analysis-item-right">
                            <span className="analysis-item-qty">
                              Qty: {item.quantity}
                            </span>
                            <span className="analysis-item-sold">
                              ₹{item.sold}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
            </div>
            
          ))}
          
        </div>
      )}
    </div>
  );
}

export default ItemSoldDetails;