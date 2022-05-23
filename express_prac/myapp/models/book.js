const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema({
  bookname: String,
  author: String,
  price: {
    type: Number,
    default: 1000,
  },
  publish: Date,
  sales: {
    type: Boolean,
    default: true,
  },
});

const bookData = mongoose.model("book", book);
module.exports = bookData;
