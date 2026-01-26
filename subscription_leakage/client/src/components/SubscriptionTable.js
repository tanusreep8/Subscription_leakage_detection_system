import React from "react";

const SubscriptionTable = ({ data, onDelete, deletingId }) => {
  // Function to determine row color based on status
  // In getRowStyle function:
const getRowStyle = (status) => {
  if (status.includes("🚨 HIGH")) {
    return {
      background: "linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 255, 255, 1))",
      borderLeft: "4px solid #ff6b6b"
    };
  }
  if (status.includes("⚠️ MEDIUM")) {
    return {
      background: "linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 255, 255, 1))",
      borderLeft: "4px solid #ffc107"
    };
  }
  if (status.includes("⚠️ Unused")) {
    return {
      background: "linear-gradient(135deg, rgba(255, 243, 205, 0.2), rgba(255, 255, 255, 1))",
      borderLeft: "4px solid #ffc107"
    };
  }
  return {
    background: "linear-gradient(135deg, rgba(212, 237, 218, 0.1), rgba(255, 255, 255, 1))",
    borderLeft: "4px solid #28a745"
  };
};

  // Function to get priority badge color
  const getPriorityColor = (index) => {
    if (index === 0) return "#dc3545"; // Red for #1
    if (index === 1) return "#fd7e14"; // Orange for #2
    if (index === 2) return "#ffc107"; // Yellow for #3
    return "#6c757d"; // Grey for others
  };

  // Function to format leakage score
  const formatLeakageScore = (score) => {
    if (score >= 1000000) return `${(score / 1000000).toFixed(1)}M`;
    if (score >= 1000) return `${(score / 1000).toFixed(1)}K`;
    return score;
  };

  // Function to get recommendation based on status
  const getRecommendation = (status, unusedDays, monthlyCost) => {
  if (status.includes("🚨 HIGH")) {
    return `Cancel immediately (wasting ₹${monthlyCost}/month)`;
  }
  if (status.includes("⚠️ MEDIUM")) {
    return `Consider pausing or downgrading (₹${monthlyCost}/month unused)`;
  }
  if (status.includes("⚠️ Unused")) {
    return `Monitor usage (free/low-cost but unused)`;
  }
  return `Keep using (actively used)`;
};

  return (
    <div style={{ overflowX: "auto", marginTop: "15px" }}>
      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse",
        fontSize: "15px"
      }}>
        <thead>
          <tr style={{ 
            background: "linear-gradient(135deg, #2c3e50, #4a6fa5)",
            color: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}>
            <th style={{ 
              padding: "16px", 
              textAlign: "center", 
              fontWeight: "600",
              width: "80px"
            }}>Priority</th>
            <th style={{ 
              padding: "16px", 
              textAlign: "left", 
              fontWeight: "600"
            }}>Service</th>
            <th style={{ 
              padding: "16px", 
              textAlign: "left", 
              fontWeight: "600"
            }}>Monthly Cost</th>
            <th style={{ 
              padding: "16px", 
              textAlign: "left", 
              fontWeight: "600"
            }}>Unused Days</th>
            <th style={{ 
              padding: "16px", 
              textAlign: "left", 
              fontWeight: "600"
            }}>Risk Score</th>
            <th style={{ 
              padding: "16px", 
              textAlign: "left", 
              fontWeight: "600"
            }}>Status</th>
            <th style={{ 
              padding: "16px", 
              textAlign: "left", 
              fontWeight: "600"
            }}>Recommendation</th>
            {onDelete && (
              <th style={{ 
                padding: "16px", 
                textAlign: "center", 
                fontWeight: "600",
                width: "120px"
              }}>Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((sub, index) => (
            <tr 
              key={sub.id} 
              style={{ 
                ...getRowStyle(sub.status),
                borderBottom: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Priority Number */}
              <td style={{ 
                padding: "16px", 
                textAlign: "center",
                verticalAlign: "middle"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: getPriorityColor(index),
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  fontWeight: "bold",
                  fontSize: "16px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}>
                  {index + 1}
                </div>
              </td>

              {/* Service Name */}
              <td style={{ 
                padding: "16px", 
                fontWeight: "600",
                fontSize: "16px",
                verticalAlign: "middle"
              }}>
                {sub.name}
              </td>

              {/* Monthly Cost */}
              <td style={{ 
                padding: "16px",
                verticalAlign: "middle"
              }}>
                <div style={{
                  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontWeight: "600",
                  color: "#2c3e50",
                  border: "1px solid #dee2e6",
                  display: "inline-block"
                }}>
                  ₹{sub.monthlyCost.toLocaleString()}
                </div>
              </td>

              {/* Unused Days */}
              <td style={{ padding: "16px", verticalAlign: "middle" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <span style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: sub.unusedDays > 60 ? "#dc3545" : 
                               sub.unusedDays > 30 ? "#fd7e14" : "#28a745"
                  }}></span>
                  <span style={{ 
                    fontWeight: "600",
                    color: sub.unusedDays > 60 ? "#dc3545" : 
                           sub.unusedDays > 30 ? "#fd7e14" : "#28a745"
                  }}>
                    {sub.unusedDays} days
                  </span>
                </div>
              </td>

              {/* Risk Score */}
              <td style={{ padding: "16px", verticalAlign: "middle" }}>
                {sub.leakageScore > 0 ? (
                  <div style={{
                    background: "linear-gradient(135deg, #ff6b6b, #dc3545)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    display: "inline-block",
                    boxShadow: "0 4px 6px rgba(220, 53, 69, 0.2)"
                  }}>
                    {formatLeakageScore(sub.leakageScore)}
                  </div>
                ) : (
                  <span style={{
                    color: "#6c757d",
                    fontStyle: "italic"
                  }}>
                    No risk
                  </span>
                )}
              </td>

              {/* Status */}
              <td style={{ padding: "16px", verticalAlign: "middle" }}>
                <span style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  backgroundColor: sub.status.includes("🚨") ? "#f8d7da" : 
                                 sub.status.includes("⚠️") ? "#fff3cd" : "#d4edda",
                  color: sub.status.includes("🚨") ? "#721c24" : 
                        sub.status.includes("⚠️") ? "#856404" : "#155724",
                  border: sub.status.includes("🚨") ? "1px solid #f5c6cb" : 
                         sub.status.includes("⚠️") ? "1px solid #ffeaa7" : "1px solid #c3e6cb",
                  minWidth: "120px",
                  textAlign: "center"
                }}>
                  {sub.status}
                </span>
              </td>

              {/* Recommendation */}
              <td style={{ 
                padding: "16px", 
                verticalAlign: "middle",
                maxWidth: "200px"
              }}>
                <div style={{
                  fontSize: "14px",
                  color: sub.status.includes("🚨") ? "#dc3545" : 
                        sub.status.includes("⚠️") ? "#fd7e14" : "#28a745",
                  lineHeight: "1.4"
                }}>
                  {getRecommendation(sub.status, sub.unusedDays, sub.monthlyCost)}
                </div>
              </td>

              {/* Delete Action */}
              {onDelete && (
                <td style={{ 
                  padding: "16px", 
                  textAlign: "center",
                  verticalAlign: "middle"
                }}>
                  <button
                    onClick={() => onDelete(sub.id)}
                    disabled={deletingId === sub.id}
                    style={{
                      padding: "10px 20px",
                      background: deletingId === sub.id 
                        ? "#cccccc" 
                        : "linear-gradient(135deg, #ff6b6b, #dc3545)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: deletingId === sub.id ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                      opacity: deletingId === sub.id ? 0.7 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      minWidth: "100px"
                    }}
                    onMouseOver={(e) => deletingId !== sub.id && (e.target.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => deletingId !== sub.id && (e.target.style.transform = "scale(1)")}
                  >
                    {deletingId === sub.id ? (
                      <>
                        <span>⏳</span>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: "16px" }}>🗑️</span>
                        Delete
                      </>
                    )}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      {data.length > 0 && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "rgba(248, 249, 250, 0.8)",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
          fontSize: "13px"
        }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "#dc3545"
              }}></div>
              <span><strong>🚨 Leakage:</strong> High cost + unused 30+ days</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "#fd7e14"
              }}></div>
              <span><strong>⚠️ Unused:</strong> Unused 30+ days but low cost</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "15px",
                height: "15px",
                borderRadius: "50%",
                background: "#28a745"
              }}></div>
              <span><strong>✅ Active:</strong> Actively used or low cost</span>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && (
        <div style={{ 
          textAlign: "center", 
          padding: "50px",
          color: "#6c757d",
          fontSize: "16px"
        }}>
          <div style={{ 
            fontSize: "48px",
            marginBottom: "20px",
            opacity: 0.5
          }}>
            📊
          </div>
          <p style={{ fontSize: "18px", marginBottom: "10px" }}>
            No leakage detected
          </p>
          <p>
            All subscriptions are actively used or within safe limits!
          </p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTable;