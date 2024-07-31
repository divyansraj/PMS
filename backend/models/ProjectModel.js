const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  status:{
    type:String,
    default: "Pending"
  }
});

module.exports =mongoose.model.Food || mongoose.model("Food",foodSchema);