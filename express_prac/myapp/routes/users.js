var express = require("express");
var router = express.Router();
const userSchema = require("../models/newuser");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const session = require("express-session");
const parseurl = require("parseurl");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  res.render("blog/auth");
});

//cookie
router.get("/cookie", (req, res) => {
  //        "key-변수-이름","value-저장하고싶은 데이터"
  res.cookie("drink", "water");
  res.send("set cookies");
});

//session : 조건부 렌더링에서 많이 사용(어떤 게시글을 만든 사람만 접근할 수 있게 하는 것, 로그인 한 사람만 글에 접근 가능하게 하는 것)
//추가적으로 세션을 활용해서 어떻게 할것인가 고민하고 찾아보고 적용해보기.

//users.js => router 구간에서만 사용 가능하게끔 제작.
//프로젝트 전체 전역으로 사용하려면 어떻게 해야할지 생각해보기.
router.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }

  // get the url pathname
  var pathname = parseurl(req).pathname;

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  next();
});

router.get("/foo", function (req, res, next) {
  res.send("you viewed this page " + req.session.views["/foo"] + " times");
});

//정규 표현식대신에 express-validator를 사용한다. 요즘에는 passport를 많이 사용.
router.post(
  "/signup",
  body("email").isEmail().withMessage("아이디는 email 형태를 따르셔야 합니다."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("비밀번호는 최소 5글자 이상입니다."),
  async (req, res) => {
    //값이 null로 들어오는 것을 방지하기 위해 async await처리.
    //코딩할때 임의의 로직도 그려보는걸 추천.(순서를 따져봐라)
    //넘어오는 값. post
    //id:email, pw:5글자 이상 적도록 처리.
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //중복 가입 확인 후 필터링 처리.
    const findresult = await userSchema.findOne({ email }).exec();

    //찾는 쿼리.
    //결과가 X => 신규가입.
    //결과가 존재 => 가입이 이미 되어있음.

    if (!findresult) {
      //암호화를 할때 기준이 되는 메시지의 길이가 존재함. 그걸 10글자로 처리.
      const salt = bcrypt.genSaltSync(10);
      //10개의 문자를 단위로 해서 password를 hash로 암호화 => ex: 1234567890 bcrypt로 hash암호화 처리.
      const bcryptPW = bcrypt.hashSync(password, salt);
      //암호화된 비밀번호는 그대로 db에 저장되며 유효성 검사할때도 암호화된 비밀번호를 서로 비교한다.
      //hash는 복호화가 안되나? 암튼 복호화가 힘들어서 원래 비밀번호를 관리자는 알지 못한다.
      //알고있다고해도 정보보안법 위반이다. 비밀번호는 사용자만 알고있는 것이다.
      //그러므로 비밀번호를 잊었다면 찾게해주는게 아니라 리셋(reset)하게 해줘야한다.

      userSchema
        .create({
          email,
          password: bcryptPW,
        })
        .then((result) => {
          res.status(200).json(result);
        });
    } else {
      res
        .status(401)
        .json({ msg: "email duplicated / 이미 가입된 계정입니다." });
    }

    //SNS로그인(Oauth), email 인증, passport 공부
  }
);

router.get("/login", (req, res) => {
  res.render("blog/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //email인증(가입했는지 안했는지) => 만약 Schema에서 email필드에 unique속성을 부여했다면 mongoose의 에러처리를 따로 해주는 방향으로 해야한다.
  const userdata = await userSchema.findOne({ email }).exec();

  if (!userdata) {
    //유저 데이터가 없다면.
    return res
      .status(401)
      .json({ msg: "User does not exist / 가입되지 않은 계정입니다." });
  } else {
    //유저데이터가 존재한다면. ==> 비밀번호가 매칭이 되는지 판단
    const pwMatch = bcrypt.compareSync(password, userdata.password);
    if (pwMatch) {
      res.status(200).json({ msg: "OK" });
    } else {
      res
        .status(401)
        .json({ msg: "Wrong password / 비밀번호가 일치하지 않습니다." });
    }
  }
});

//쿠키와 세션.
//쿠키 : 사용자의 브라우저에 저장하는 데이터 모음 ==> JWT token. 요즘 트렌드(모바일도 지원).
//쿠키 이점 :
// 1.정보 저장량을 분산시키므로 비용이 절감된다.
// 2.보안 이슈의 문제로부터 훨씬 자유롭게 된다.-> 클라이언트에 저장하니까.
//세션 : 서버쪽에 저장하는 데이터 모음 ==> 많은 정보를 저장하게 됩니다(모바일 미지원).

module.exports = router;
