const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("test express");
  res.send("hello express");
  next();
});

router.get("/", (req, res, next) => {
  console.log("2nd express");
});

router.get("/member", (req, res) => {
  res.send("call member");
});

// :id에서 :는 id를 변수로 활용해서 값을 받겠다는 의미이다.(실제 url에서 kim을 입력하면 id = kim 이 된다.)
router.get("/member/:id", (req, res) => {
  const member = req.params.id;
  console.log(member);
  res.send(`${member}`);
});

module.exports = router;
