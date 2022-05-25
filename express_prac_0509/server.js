//express module 불러오기
const express = require('express');
//.env (environment?)파일 불러오기 => .env : express server 환경변수
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const { MONGO_URI, PORT } = process.env;
const userRouter = require('./router/userRouter'); //User router import
const User = require('./models/users'); //User model(Schema) import

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

//json parse (body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router 연결
app.use('/user', userRouter);

//ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//server 실행 시 localhost:3000으로 이동하면 나오는 root page(기본 페이지) 렌더링
app.get('', (req, res) => {
  // view에 code를 send하는 response
  // res.send(`<h1>Hi, I'm RooT!</h1>`);
  // view에 index.html을 send하는 reponse
  // res.sendFile(__dirname + '/index.html');
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { users });
    }
  });
});

app.listen(3000, () => {
  console.log(`Server is running in ${PORT}`);
});
