const mongoose = require("mongoose");

const SnackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Example: Healthy, Junk, etc.
  calories: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Snack", SnackSchema);
