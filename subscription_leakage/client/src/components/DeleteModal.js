import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, subscriptionName }) => {
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
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        maxWidth: "400px",
        width: "90%",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>
        <h3 style={{ marginTop: 0, color: "#d32f2f" }}>⚠️ Delete Subscription</h3>
        <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
          Are you sure you want to delete <strong>"{subscriptionName}"</strong>?
          <br />
          This action cannot be undone.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "25px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              background: "#f5f5f5",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #d32f2f, #b71c1c)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;