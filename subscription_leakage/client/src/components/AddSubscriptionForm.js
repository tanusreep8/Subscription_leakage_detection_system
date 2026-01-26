import React, { useState } from "react";
import axios from "axios";

const AddSubscriptionForm = ({ refreshData }) => {
  const [formData, setFormData] = useState({
    name: "",
    monthlyCost: "",
    lastUsedDate: "",
    renewalDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/subscriptions", {
        ...formData,
        monthlyCost: Number(formData.monthlyCost),
        isActive: true
      });
      alert("✅ Subscription added successfully!");
      setFormData({
        name: "",
        monthlyCost: "",
        lastUsedDate: "",
        renewalDate: "",
      });
      refreshData();
    } catch (error) {
      alert("❌ Failed to add subscription.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      marginBottom: "40px", 
      padding: "30px", 
      borderRadius: "16px",
      background: "white",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      border: "1px solid #e9ecef",
      position: "relative"
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        height: "4px",
        background: "linear-gradient(90deg, #3498db, #9b59b6)",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px"
      }}></div>
      
      <h3 style={{ 
        marginTop: "10px", 
        color: "#2c3e50", 
        borderBottom: "2px solid #e9ecef", 
        paddingBottom: "15px",
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <span style={{
          background: "#e9ecef",
          padding: "8px 12px",
          borderRadius: "10px",
          color: "#495057"
        }}>
          ➕
        </span>
        Add New Subscription
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "25px", 
          marginBottom: "25px"
        }}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              fontWeight: "600",
              color: "#495057",
              fontSize: "15px"
            }}>
              Service Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Netflix, Spotify, Adobe, etc."
              style={{ 
                width: "100%", 
                padding: "14px", 
                borderRadius: "10px",
                border: "1px solid #ced4da",
                fontSize: "16px",
                background: "white",
                color: "#495057",
                transition: "border 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              fontWeight: "600",
              color: "#495057",
              fontSize: "15px"
            }}>
              Monthly Cost (₹):
            </label>
            <input
              type="number"
              name="monthlyCost"
              value={formData.monthlyCost}
              onChange={handleChange}
              required
              placeholder="649"
              min="0"
              style={{ 
                width: "100%", 
                padding: "14px", 
                borderRadius: "10px",
                border: "1px solid #ced4da",
                fontSize: "16px",
                background: "white",
                color: "#495057",
                transition: "border 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              fontWeight: "600",
              color: "#495057",
              fontSize: "15px"
            }}>
              Last Used Date:
            </label>
            <input
              type="date"
              name="lastUsedDate"
              value={formData.lastUsedDate}
              onChange={handleChange}
              required
              style={{ 
                width: "100%", 
                padding: "14px", 
                borderRadius: "10px",
                border: "1px solid #ced4da",
                fontSize: "16px",
                background: "white",
                color: "#495057",
                transition: "border 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
            <small style={{ 
              color: "#6c757d", 
              fontSize: "13px", 
              marginTop: "8px", 
              display: "block" 
            }}>
              When did you last use this service?
            </small>
          </div>

          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "10px", 
              fontWeight: "600",
              color: "#495057",
              fontSize: "15px"
            }}>
              Renewal Date:
            </label>
            <input
              type="date"
              name="renewalDate"
              value={formData.renewalDate}
              onChange={handleChange}
              required
              style={{ 
                width: "100%", 
                padding: "14px", 
                borderRadius: "10px",
                border: "1px solid #ced4da",
                fontSize: "16px",
                background: "white",
                color: "#495057",
                transition: "border 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498db"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
            <small style={{ 
              color: "#6c757d", 
              fontSize: "13px", 
              marginTop: "8px", 
              display: "block" 
            }}>
              When does this subscription renew?
            </small>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: "16px 40px", 
            background: loading 
              ? "#cccccc" 
              : "linear-gradient(135deg, #3498db, #2980b9)", 
            color: "white", 
            border: "none", 
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.3s",
            width: "100%",
            boxShadow: "0 8px 25px rgba(52, 152, 219, 0.3)",
            position: "relative",
            overflow: "hidden"
          }}
          onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-3px)")}
          onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)")}
        >
          {loading ? (
            <>
              <span style={{ marginRight: "10px" }}>⏳</span>
              Adding Subscription...
            </>
          ) : (
            <>
              <span style={{ marginRight: "10px" }}>➕</span>
              Add New Subscription
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddSubscriptionForm;