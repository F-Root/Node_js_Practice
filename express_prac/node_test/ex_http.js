//05_09 실시간 실습 3번 문제
var http = require('http');

//1. 함수 `onRequest()` 인자에 req와 res를 넣어줍니다.
function onRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  //2. html 본문(body)에 보여지는 부분을 입력하는 메서드인 res.write()를 사용해서 "Hello World"를 띄우세요.
  res.write('Hello World');
  //3. 응답을 종료하는 메서드인 res.end()를 작성하세요.
  res.end();
}

http.createServer(onRequest).listen(8080);
//node ex_http.js를 실행한 후
//브라우저에 가서 localhost:8080을 url창에 입력하면
//Hello World를 확인할 수 있다.
