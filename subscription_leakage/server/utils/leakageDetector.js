const detectLeakage = (subscriptions) => {
  const today = new Date();
  let totalLeakage = 0;

  const report = subscriptions.map((sub) => {
    // Calculate unused days
    const unusedDays = Math.floor(
      (today - new Date(sub.lastUsedDate)) / (1000 * 60 * 60 * 24)
    );

    // UPDATED LOGIC: Any subscription unused for 30+ days is leakage
    const isUnused = unusedDays > 30;
    const isExpensive = sub.monthlyCost > 500;
    
    // Now leakage has 3 levels:
    // 1. High Risk: Unused + Expensive (>₹500)
    // 2. Medium Risk: Unused but not expensive
    // 3. Safe: Used recently
    
    let leakageScore = 0;
    let leakageType = "SAFE";
    
    if (isUnused && isExpensive) {
      // HIGH RISK: Expensive + Unused
      leakageScore = Math.floor(sub.monthlyCost * unusedDays * 2); // Double weight
      totalLeakage += sub.monthlyCost;
      leakageType = "HIGH_RISK";
    } else if (isUnused) {
      // MEDIUM RISK: Unused but cheap
      leakageScore = Math.floor(sub.monthlyCost * unusedDays);
      totalLeakage += sub.monthlyCost; // Still count it as leakage
      leakageType = "MEDIUM_RISK";
    }

    // Determine status message
    let status = "✅ Active";
    if (leakageType === "HIGH_RISK") {
      status = "🚨 HIGH Leakage";
    } else if (leakageType === "MEDIUM_RISK") {
      status = "⚠️ MEDIUM Leakage";
    } else if (isUnused) {
      status = "⚠️ Unused";
    }

    return {
      id: sub._id.toString(),
      name: sub.name,
      monthlyCost: sub.monthlyCost,
      unusedDays: unusedDays,
      leakageScore: leakageScore,
      leakageType: leakageType,
      status: status,
      subscriptionData: sub
    };
  });

  // Sort by highest leakage score (most dangerous first)
  report.sort((a, b) => b.leakageScore - a.leakageScore);

  return { totalLeakage, report };
};

module.exports = detectLeakage;