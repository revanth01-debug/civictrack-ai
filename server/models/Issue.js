const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  issueType: {
    type: String,
    required: true,
  },

  severity: {
    type: String,
    default: "Medium",
  },

  priority: {
    type: String,
    default: "Medium",
  },

  suggestedAction: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    required: true,
  },

  district: {
    type: String,
    default: "",
  },

  state: {
    type: String,
    default: "Telangana",
  },

  latitude: {
    type: Number,
    default: 0,
  },

  longitude: {
    type: Number,
    default: 0,
  },
 
  image: {
  type: String,
  default: "",
},

  status: {
    type: String,
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Issue", IssueSchema);