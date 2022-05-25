//express module 불러오기
const express = require('express');
//.env (environment?)파일 불러오기 => .env : express server 환경변수
require('dotenv').config();
const app = express();

app.get('', (req, res) => {
  // res.send(`<h1>Hi, I'm RooT!</h1>`);
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log(`Server is running in ${process.env.PORT}`);
});
