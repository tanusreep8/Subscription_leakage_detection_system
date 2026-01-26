const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const detectLeakage = require("../utils/leakageDetector");

/**
 * @route   POST /api/subscriptions
 * @desc    Add new subscription
 */
router.post("/", async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/subscriptions
 * @desc    Get all subscriptions
 */
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @route   GET /api/subscriptions/leakage
 * @desc    Detect subscription leakage
 */
router.get("/leakage", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    const result = detectLeakage(subscriptions);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @route   DELETE /api/subscriptions/:id
 * @desc    Delete a subscription
 */
router.delete("/:id", async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    
    await subscription.deleteOne();
    res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @route   PUT /api/subscriptions/:id
 * @desc    Update a subscription
 */
router.put("/:id", async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    
    // Update fields
    Object.keys(req.body).forEach((key) => {
      subscription[key] = req.body[key];
    });
    
    await subscription.save();
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
