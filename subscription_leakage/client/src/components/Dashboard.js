import React, { useEffect, useState } from "react";
import { getLeakageReport, getSubscriptions, deleteSubscription, updateSubscription } from "../services/api";
import SummaryCard from "./SummaryCard";
import SubscriptionTable from "./SubscriptionTable";
import LeakageCharts from "./LeakageCharts";
import AddSubscriptionForm from "./AddSubscriptionForm";
import DeleteModal from "./DeleteModal";
import EditSubscriptionModal from "./EditSubscriptionModal";

const Dashboard = () => {
  // State for data
  const [report, setReport] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [totalLeakage, setTotalLeakage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // State for delete functionality
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  // State for edit functionality
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  
  const [error, setError] = useState("");

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Fetch leakage report
      const leakageRes = await getLeakageReport();
      setReport(leakageRes.data.report);
      setTotalLeakage(leakageRes.data.totalLeakage);

      // Fetch all subscriptions
      const subsRes = await getSubscriptions();
      setAllSubscriptions(subsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data from server. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchData();
  }, []);

  // Delete subscription handler (from All Subscriptions table)
  const handleDeleteClick = (subscription) => {
    setSubscriptionToDelete(subscription);
    setDeleteModalOpen(true);
  };

  // Delete from Leakage Analysis table
  const handleDeleteFromLeakage = async (id) => {
    if (!window.confirm("Delete this subscription from leakage analysis?")) return;
    
    setDeletingId(id);
    try {
      await deleteSubscription(id);
      await fetchData();
      alert("✅ Subscription deleted successfully!");
    } catch (error) {
      alert("❌ Failed to delete subscription");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  // Confirm deletion from modal
  const handleConfirmDelete = async () => {
    if (!subscriptionToDelete) return;
    
    setDeletingId(subscriptionToDelete._id);
    try {
      await deleteSubscription(subscriptionToDelete._id);
      await fetchData();
      alert("✅ Subscription deleted successfully!");
    } catch (error) {
      alert("❌ Failed to delete subscription");
      console.error(error);
    } finally {
      setDeletingId(null);
      setDeleteModalOpen(false);
      setSubscriptionToDelete(null);
    }
  };

  // Close delete modal
  const handleCloseModal = () => {
    setDeleteModalOpen(false);
    setSubscriptionToDelete(null);
  };

  // Edit subscription handler
  const handleEditClick = (subscription) => {
    setSubscriptionToEdit(subscription);
    setEditModalOpen(true);
  };

  // Edit from Leakage Analysis table
  const handleEditFromLeakage = async (id) => {
    // Find the subscription by id
    const subscription = allSubscriptions.find(sub => sub._id === id);
    if (subscription) {
      handleEditClick(subscription);
    }
  };

  // Save edited subscription
  const handleSaveEdit = async (updatedData) => {
    if (!subscriptionToEdit) return;
    
    setUpdatingId(subscriptionToEdit._id);
    try {
      await updateSubscription(subscriptionToEdit._id, updatedData);
      await fetchData();
      setEditModalOpen(false);
      setSubscriptionToEdit(null);
      alert("✅ Subscription updated successfully!");
    } catch (error) {
      alert("❌ Failed to update subscription");
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSubscriptionToEdit(null);
  };

  // Loading state
  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/886/963/591/gradient-minimalism-background-wallpaper-preview.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}>
          <h2 style={{ margin: 0, color: "#2c3e50" }}>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/886/963/591/gradient-minimalism-background-wallpaper-preview.jpg')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        padding: "20px"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
          textAlign: "center",
          maxWidth: "600px"
        }}>
          <h2 style={{ color: "#e74c3c", marginTop: 0 }}>{error}</h2>
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}>
            Make sure backend server is running on http://localhost:5000
          </p>
          <button 
            onClick={fetchData}
            style={{
              padding: "12px 30px",
              background: "linear-gradient(135deg, #3498db, #2980b9)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('https://c4.wallpaperflare.com/wallpaper/886/963/591/gradient-minimalism-background-wallpaper-preview.jpg')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      padding: "30px 20px"
    }}>
      {/* Main White Container */}
      <div style={{ 
        maxWidth: "1300px", 
        margin: "auto",
        background: "rgba(255, 255, 255, 0.97)",
        borderRadius: "20px",
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
        overflow: "hidden",
        position: "relative"
      }}>
        {/* Decorative Top Border */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, #3498db, #9b59b6, #e74c3c, #f1c40f)",
          zIndex: 1
        }}></div>

        {/* Header Section */}
        <div style={{
          padding: "40px 40px 20px",
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
          borderBottom: "1px solid #dee2e6",
          textAlign: "center"
        }}>
          <h1 style={{ 
            color: "#2c3e50", 
            marginBottom: "15px",
            fontSize: "2.8rem",
            fontWeight: "700",
            letterSpacing: "0.5px"
          }}>
            💳 Subscription Leakage Detection System
          </h1>
          
          <p style={{
            color: "#6c757d",
            fontSize: "1.1rem",
            marginTop: "0",
            fontWeight: "400"
          }}>
            Track, analyze, and optimize your subscription expenses
          </p>
        </div>

        {/* Content Area */}
        <div style={{ padding: "30px 40px 40px" }}>
          {/* Add New Subscription Form */}
          <AddSubscriptionForm refreshData={fetchData} />

          {/* Summary Card */}
          <SummaryCard amount={totalLeakage} />

          {/* All Subscriptions Table */}
          <div style={{ 
            backgroundColor: "white", 
            padding: "30px", 
            borderRadius: "16px",
            marginBottom: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid #e9ecef",
            position: "relative"
          }}>
            {/* Decorative corner */}
            <div style={{
              position: "absolute",
              top: "0",
              right: "0",
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, transparent 50%, rgba(52, 152, 219, 0.1) 50%)",
              borderBottomLeftRadius: "16px"
            }}></div>
            
            <h3 style={{ 
              marginTop: 0, 
              color: "#2c3e50", 
              borderBottom: "2px solid #dee2e6", 
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
                📋
              </span>
              All Subscriptions 
              <span style={{
                background: "#3498db",
                color: "white",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: "600"
              }}>
                {allSubscriptions.length}
              </span>
            </h3>
            
            {allSubscriptions.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                padding: "50px 20px",
                color: "#6c757d",
                borderRadius: "12px",
                background: "#f8f9fa",
                border: "1px dashed #dee2e6"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "20px", opacity: 0.5 }}>📭</div>
                <p style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "500" }}>No subscriptions found</p>
                <p>Start by adding your first subscription using the form above!</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto", marginTop: "20px" }}>
                <table style={{ 
                  width: "100%", 
                  borderCollapse: "collapse",
                  fontSize: "15px"
                }}>
                  <thead>
                    <tr style={{ 
                      background: "linear-gradient(135deg, #4a6fa5, #6a93d6)",
                      color: "white"
                    }}>
                      <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600" }}>Service Name</th>
                      <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600" }}>Monthly Cost</th>
                      <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600" }}>Last Used</th>
                      <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600" }}>Renewal Date</th>
                      <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600" }}>Status</th>
                      <th style={{ padding: "16px 20px", textAlign: "left", fontWeight: "600" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSubscriptions.map((sub, index) => (
                      <tr key={sub._id} style={{ 
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                        borderBottom: "1px solid #dee2e6",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e9ecef";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f8f9fa" : "white";
                      }}
                      >
                        <td style={{ padding: "16px 20px", fontWeight: "500", color: "#2c3e50" }}>{sub.name}</td>
                        <td style={{ padding: "16px 20px", fontWeight: "500", color: "#2c3e50" }}>
                          <span style={{
                            background: "#e9ecef",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            border: "1px solid #dee2e6",
                            display: "inline-block",
                            fontWeight: "600"
                          }}>
                            ₹{sub.monthlyCost}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#495057" }}>
                          {new Date(sub.lastUsedDate).toLocaleDateString('en-IN')}
                        </td>
                        <td style={{ padding: "16px 20px", color: "#495057" }}>
                          {new Date(sub.renewalDate).toLocaleDateString('en-IN')}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{
                            display: "inline-block",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "600",
                            backgroundColor: sub.isActive ? "#d4edda" : "#f8d7da",
                            color: sub.isActive ? "#155724" : "#721c24",
                            border: sub.isActive ? "1px solid #c3e6cb" : "1px solid #f5c6cb"
                          }}>
                            {sub.isActive ? "✅ Active" : "❌ Inactive"}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", gap: "12px" }}>
                            {/* Edit Button */}
                            <button
                              onClick={() => handleEditClick(sub)}
                              disabled={updatingId === sub._id}
                              style={{
                                padding: "8px 20px",
                                background: updatingId === sub._id 
                                  ? "#cccccc" 
                                  : "linear-gradient(135deg, #4a6fa5, #2c3e50)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: updatingId === sub._id ? "not-allowed" : "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                                opacity: updatingId === sub._id ? 0.7 : 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 4px 15px rgba(52, 152, 219, 0.2)"
                              }}
                              onMouseOver={(e) => updatingId !== sub._id && (e.target.style.transform = "translateY(-2px)")}
                              onMouseOut={(e) => updatingId !== sub._id && (e.target.style.transform = "translateY(0)")}
                            >
                              {updatingId === sub._id ? (
                                <>⏳</>
                              ) : (
                                <>✏️</>
                              )}
                              {updatingId === sub._id ? "Editing..." : "Edit"}
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteClick(sub)}
                              disabled={deletingId === sub._id}
                              style={{
                                padding: "8px 20px",
                                background: deletingId === sub._id 
                                  ? "#cccccc" 
                                  : "linear-gradient(135deg, #ff6b6b, #d32f2f)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: deletingId === sub._id ? "not-allowed" : "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                                opacity: deletingId === sub._id ? 0.7 : 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                boxShadow: "0 4px 15px rgba(231, 76, 60, 0.2)"
                              }}
                              onMouseOver={(e) => deletingId !== sub._id && (e.target.style.transform = "translateY(-2px)")}
                              onMouseOut={(e) => deletingId !== sub._id && (e.target.style.transform = "translateY(0)")}
                            >
                              {deletingId === sub._id ? (
                                <>⏳</>
                              ) : (
                                <>🗑️</>
                              )}
                              {deletingId === sub._id ? "Deleting..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Leakage Analysis Section */}
          {report.length > 0 && (
            <div style={{ 
              backgroundColor: "white", 
              padding: "30px", 
              borderRadius: "16px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef",
              position: "relative"
            }}>
              {/* Decorative corner */}
              <div style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, transparent 50%, rgba(231, 76, 60, 0.1) 50%)",
                borderBottomLeftRadius: "16px"
              }}></div>
              
              <h3 style={{ 
                marginTop: 0, 
                color: "#2c3e50", 
                borderBottom: "2px solid #dee2e6", 
                paddingBottom: "15px",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  background: "#ffe5e5",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  color: "#721c24"
                }}>
                  🚨
                </span>
                Leakage Analysis (Priority Ranking)
                <span style={{
                  background: "#ff6b6b",
                  color: "white",
                  padding: "6px 16px",
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: "600"
                }}>
                  {report.filter(r => r.status.includes("🚨")).length} leaking
                </span>
              </h3>
              <SubscriptionTable 
                data={report} 
                onDelete={handleDeleteFromLeakage} 
                onEdit={handleEditFromLeakage}
                deletingId={deletingId}
                updatingId={updatingId}
              />
            </div>
          )}

          {/* Charts Section */}
          {report.length > 0 && (
            <div style={{ 
              backgroundColor: "white", 
              padding: "30px", 
              borderRadius: "16px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              border: "1px solid #e9ecef",
              position: "relative"
            }}>
              {/* Decorative corner */}
              <div style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, transparent 50%, rgba(46, 204, 113, 0.1) 50%)",
                borderBottomLeftRadius: "16px"
              }}></div>
              
              <h3 style={{ 
                marginTop: 0, 
                color: "#2c3e50", 
                borderBottom: "2px solid #dee2e6", 
                paddingBottom: "15px",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  background: "#e8f5e9",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  color: "#155724"
                }}>
                  📊
                </span>
                Financial Insights & Visualization
              </h3>
              <LeakageCharts report={report} totalLeakage={totalLeakage} />
            </div>
          )}

          {/* Stats Footer */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            padding: "25px",
            backgroundColor: "#f8f9fa",
            borderRadius: "16px",
            fontSize: "15px",
            color: "#495057",
            border: "1px solid #dee2e6",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
          }}>
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#3498db" }}>
                {allSubscriptions.length}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Total Subscriptions</div>
            </div>
            
            <div style={{ 
              height: "50px", 
              width: "1px", 
              background: "#dee2e6",
              margin: "0 20px"
            }}></div>
            
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#2ecc71" }}>
                ₹{allSubscriptions.reduce((sum, sub) => sum + sub.monthlyCost, 0).toLocaleString()}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Total Monthly Cost</div>
            </div>
            
            <div style={{ 
              height: "50px", 
              width: "1px", 
              background: "#dee2e6",
              margin: "0 20px"
            }}></div>
            
            <div style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: totalLeakage > 0 ? "#e74c3c" : "#2ecc71" }}>
                ₹{totalLeakage.toLocaleString()}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.8 }}>Potential Monthly Savings</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "20px 40px",
          background: "#f8f9fa",
          borderTop: "1px solid #dee2e6",
          textAlign: "center",
          color: "#6c757d",
          fontSize: "14px"
        }}>
          <p style={{ margin: 0 }}>
            💸 Subscription Leakage Detection System • Track & Optimize Your Expenses
          </p>
          <p style={{ margin: "5px 0 0", fontSize: "12px", opacity: 0.6 }}>
            All data is stored locally • Your financial privacy is our priority
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        subscriptionName={subscriptionToDelete?.name || ""}
      />

      {/* Edit Subscription Modal */}
      <EditSubscriptionModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        subscription={subscriptionToEdit}
        loading={updatingId === subscriptionToEdit?._id}
      />
    </div>
  );
};

export default Dashboard;