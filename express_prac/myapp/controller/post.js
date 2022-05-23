const BookSchema = require("../models/book");

const getbookinfo = (req, res) => {
  const author = req.params.id;

  BookSchema.findOne({ author })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addbook = (req, res) => {
  const { bookname, author, price, date } = req.body;
  const priceCheck = price || 5000;

  let bookData = new BookSchema({
    bookname,
    author,
    price: priceCheck,
    publish: date,
  });

  bookData.save();
  res.redirect("/post");
};

module.exports = { getbookinfo, addbook };
