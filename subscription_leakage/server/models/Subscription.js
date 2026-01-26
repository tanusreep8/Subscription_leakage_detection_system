const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  monthlyCost: {
    type: Number,
    required: true,
  },
  lastUsedDate: {
    type: Date,
    required: true,
  },
  renewalDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
