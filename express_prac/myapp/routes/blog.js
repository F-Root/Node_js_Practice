const express = require("express");
const router = express.Router();
const blogSchema = require("../models/blog");

router.get("/", async (req, res) => {
  const result = await blogSchema.find({}).exec();
  //localhost:3000/blog
  res.render("blog/blog", { content: result }); //routes의 index.js 참조
});

router.get("/read/:id", async (req, res) => {
  const contentNo = req.params.id;
  console.log(contentNo);

  const result = await blogSchema.findOne({ no: contentNo }).exec();
  res.render("blog/blog-content", { content: result });
});

router.get("/write", (req, res) => {
  res.render("blog/write");
});

router.post("/write", (req, res, next) => {
  const { title, content } = req.body;

  const blogText = new blogSchema({
    title,
    content,
  });

  blogText
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/blog");
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//글삭제
router.delete("/delete/:id", (req, res) => {
  const no = req.params.id;
  //deleteOne로 작성해도 됨.
  blogSchema
    .findOneAndDelete({ no })
    .then((result) => {
      //성공적인 결과
      console.log(result);
      //그냥 res.redirect()를 사용하면 의도와는 맞지않게 동작할 가능성이 크다.
      //그래서 redirect라는 변수에 경로를 담아서 데이터를 전송한다.
      return res.status(200).json({ redirect: "/blog" });
    })
    .catch((err) => {
      //오류가 발생했을때.
      console.log(err);
    });
});

//글수정
router.get("/update/:id", async (req, res) => {
  const contentNo = req.params.id;
  const result = await blogSchema.findOne({ no: contentNo }).exec();
  res.render("blog/blog-update", { content: result });
});

router.post("/updateBlog/:id", async (req, res) => {
  const { title, content } = req.body;
  const no = req.params.id;

  await blogSchema.findOneAndUpdate({ no }, { title, content }).exec();

  //데이터를 수정한 후 => 수정된 내용을 확인할 수 있는 페이지로 이동
  const updateResult = await blogSchema.findOne({ no }).exec();
  res.render("blog/blog-content", { content: updateResult });
});

module.exports = router;
