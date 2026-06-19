import { useEffect, useState } from "react";

function ItemSoldDetails() {
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalysis = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5001/items-analysis");

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

  return (
    <div className="analysis">
      <h2 className="analysis-title">Sales Analysis</h2>

      {analysisData.length === 0 ? (
        <p className="analysis-empty">No sales data found</p>
      ) : (
        <div className="analysis-list">
          {analysisData.map((category) => {
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
      )}
    </div>
  );
}

export default ItemSoldDetails;