const mongoose = require("mongoose");
const { Schema } = mongoose;

const stationSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide station name"],
    },
    coffee: {
      type: String,
      required: [true, "Please provide coffee name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    photo: {
      type: String
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Station", stationSchema);