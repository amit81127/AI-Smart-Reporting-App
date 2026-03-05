const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
 userId: String,
 issueType: String,
 location: String,
 description: String,
 status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Report", ReportSchema);
