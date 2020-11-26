let mongoose = require("mongoose");

let person = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: Number,

  favoriteFoods: [String],
});

module.exports= mongoose.model('person',person)