const express = require("express");
const BookSchema = require("../models/book"); //컨트롤러를 작성했으면 지워도 무방하다.
const bookController = require("../controller/post");
const UserSchema = require("../models/user");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("post"); // post.ejs 파일을 render
});

router.get("/del", (req, res) => {
  res.render("delete");
});

// controller 이용X
// router.get("/bookinfo/:id", (req, res) => {
//   const author = req.params.id;

//   //   BookSchema.findOne({ author }, (err, result) => {
//   //     if (result) {
//   //       return res.json(result);
//   //     } else {
//   //       return res.send("등록된 작가가 없습니다.");
//   //     }
//   //   });

//   BookSchema.findOne({ author })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
// controller 이용O
router.get("/bookinfo/:id", bookController.getbookinfo);

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

// controller 이용X
// router.post("/addbook", (req, res) => {
//   const { bookname, author, price, date } = req.body;
//   const priceCheck = price || 5000;

//   let bookData = new BookSchema({
//     bookname,
//     author,
//     price: priceCheck,
//     publish: date,
//   });

//   bookData.save();
//   res.redirect("/post");
// });
// controller 이용O
router.post("/addbook", bookController.addbook);

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

//bookinfo에 있는 정보를 다 가져오는 코드
router.get("/getlist", async (req, res) => {
  // const result = BookSchema.find({}, (req, res) => {}); //의 형식을 아래처럼 변경.
  const result = await BookSchema.find({}).exec(); //exec()라는 실행코드를 꼭 붙여야함.

  return res.status(200).json(result);
});

//error handling
router.get("/users", async (req, res, next) => {
  try {
    // const userid = req.body.userid;
    // const job = req.body.job;
    const { userid, job } = req.body;
    const user = new UserSchema({
      userid: userid,
      job: job,
    });
    const result = await user.save();
    res.status(200).json({
      result,
      message: "user saved",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }

  res.render("user");
});

module.exports = router;
