const SummaryCard = ({ amount }) => {
  return (
    <div
      style={{
        background: amount > 0 
          ? "linear-gradient(135deg, #ffe5e5, #ffcccc)" 
          : "linear-gradient(135deg, #d4edda, #c3e6cb)",
        padding: "30px",
        margin: "0 0 30px 0",
        borderRadius: "16px",
        fontSize: "26px",
        fontWeight: "700",
        color: amount > 0 ? "#721c24" : "#155724",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: amount > 0 ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "150px",
        height: "150px",
        background: amount > 0 
          ? "radial-gradient(circle, rgba(231, 76, 60, 0.1) 0%, transparent 70%)" 
          : "radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)",
        borderRadius: "50%"
      }}></div>
      
      <div style={{
        position: "absolute",
        bottom: "-30px",
        left: "-30px",
        width: "100px",
        height: "100px",
        background: amount > 0 
          ? "radial-gradient(circle, rgba(231, 76, 60, 0.05) 0%, transparent 70%)" 
          : "radial-gradient(circle, rgba(46, 204, 113, 0.05) 0%, transparent 70%)",
        borderRadius: "50%"
      }}></div>
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: "15px",
        marginBottom: "10px",
        position: "relative",
        zIndex: 2
      }}>
        <span style={{ fontSize: "32px" }}>
          {amount > 0 ? "💸" : "💰"}
        </span>
        <span>Monthly Financial Leakage</span>
      </div>
      
      <div style={{ 
        fontSize: "36px", 
        marginTop: "10px",
        position: "relative",
        zIndex: 2
      }}>
        ₹{amount.toLocaleString()}
      </div>
      
      <div style={{ 
        fontSize: "18px", 
        marginTop: "15px", 
        opacity: 0.9,
        fontWeight: "500",
        position: "relative",
        zIndex: 2
      }}>
        {amount > 0 
          ? "⚠️ Take immediate action to reduce leakage!" 
          : "✅ Great! No financial leakage detected."}
      </div>
    </div>
  );
};

export default SummaryCard;