const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  balance: { type: String, required: true },
  equity: { type: String, required: true },
  market_watch_time: { type: String, required: true },
});

module.exports = mongoose.model("Account", accountSchema);
