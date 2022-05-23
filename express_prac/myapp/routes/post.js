const express = require("express");
const BookSchema = require("../models/book");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("post"); // post.ejs 파일을 render
});

router.get("/del", (req, res) => {
  res.render("delete");
});

router.get("/bookinfo/:id", (req, res) => {
  const author = req.params.id;

  //   BookSchema.findOne({ author }, (err, result) => {
  //     if (result) {
  //       return res.json(result);
  //     } else {
  //       return res.send("등록된 작가가 없습니다.");
  //     }
  //   });

  BookSchema.findOne({ author })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res, next) => {
  //   const name = req.body.name;
  //   const phone = req.body.phone;
  //   const date = req.body.date;

  // 웹 통신 방식은 무조건 1요청 1응답.
  // 1요청 1응답 이면 통신 정상 종료.
  // 따라서 res는 return처럼 하나만 있어야한다.
  // 고로 res.json() 혹은 res.redirect()둘중에 하나만 작동되게 해야함.

  //요청 받기.
  const { name, phone, date } = req.body;

  //응답 보내기.
  res.json({ name: name, phone: phone, date: date });

  // next();
});

// router.post("/", (req, res) => {
//   // res.redirect => 호출한 경로(함수 인자로 넣은 경로)로 재 접근.
//   res.redirect("/post");
// });

router.post("/addbook", (req, res) => {
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
});

router.delete("/del/:id", (req, res) => {
  const bookname = req.params.id;

  BookSchema.findOneAndDelete({ bookname })
    .then((result) => {
      res.json({ redirect: "/post" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/del/:id", (req, res) => {
  const bookname = req.params.id;

  BookSchema.findOneAndDelete({ bookname })
    .then((result) => {
      console.log(result);
      res.json({ redirect: "/post" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
