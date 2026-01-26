import React, { useState, useEffect } from "react";

const EditSubscriptionModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  subscription,
  loading 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    monthlyCost: "",
    lastUsedDate: "",
    renewalDate: "",
  });

  // Initialize form when subscription data changes
  useEffect(() => {
    if (subscription) {
      // Format dates for input fields (YYYY-MM-DD)
      const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      setFormData({
        name: subscription.name || "",
        monthlyCost: subscription.monthlyCost || "",
        lastUsedDate: subscription.lastUsedDate ? formatDateForInput(subscription.lastUsedDate) : "",
        renewalDate: subscription.renewalDate ? formatDateForInput(subscription.renewalDate) : "",
      });
    }
  }, [subscription]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert monthlyCost to number
    const dataToSend = {
      ...formData,
      monthlyCost: Number(formData.monthlyCost)
    };
    
    onSave(dataToSend);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "500px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ 
          marginTop: 0, 
          color: "#2c3e50", 
          borderBottom: "2px solid #4a6fa5", 
          paddingBottom: "10px",
          fontSize: "22px"
        }}>
          ✏️ Edit Subscription
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#333"
            }}>
              Service Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#333"
            }}>
              Monthly Cost (₹):
            </label>
            <input
              type="number"
              name="monthlyCost"
              value={formData.monthlyCost}
              onChange={handleChange}
              required
              min="0"
              step="1"
              style={{ 
                width: "100%", 
                padding: "12px", 
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#333"
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
                padding: "12px", 
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
            <small style={{ color: "#666", fontSize: "13px", marginTop: "5px", display: "block" }}>
              When did you last use this service?
            </small>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#333"
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
                padding: "12px", 
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
            <small style={{ color: "#666", fontSize: "13px", marginTop: "5px", display: "block" }}>
              When does this subscription renew?
            </small>
          </div>

          <div style={{ 
            display: "flex", 
            justifyContent: "flex-end", 
            gap: "15px",
            borderTop: "1px solid #eee",
            paddingTop: "20px"
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "12px 25px",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                color: "#333",
                transition: "all 0.3s",
                minWidth: "100px"
              }}
              onMouseOver={(e) => !loading && (e.target.style.background = "#e0e0e0")}
              onMouseOut={(e) => !loading && (e.target.style.background = "#f5f5f5")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 25px",
                background: loading ? "#cccccc" : "linear-gradient(135deg, #4a6fa5, #2c3e50)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s",
                minWidth: "120px"
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => !loading && (e.target.style.transform = "translateY(0)")}
            >
              {loading ? (
                <>
                  <span>⏳</span> Saving...
                </>
              ) : (
                <>
                  <span>💾</span> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubscriptionModal;