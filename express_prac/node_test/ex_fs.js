//05_09 실시간 실습 4번 문제
//main.js
var fs = require('fs');

//1. readFileSync() 메소드를 사용해서 text에 저장합니다. 그리고 동기적으로 text.txt파일을 읽으세요.(null을 대체하세요.)
var text = fs.readFileSync('test.txt', 'utf8');
console.log('동기적 읽기 ' + text);

//2. readFile()메소드를 사용해서 비동기적으로 text.txt 파일을 읽은 뒤 문자열을 반환하세요. (readFile()메소드 내에 함수를 생성해서 data를 인자로 전달하세요.)

var data = fs.readFile('test.txt', 'utf8', (err, data) => {
  console.log('비동기적 읽기 ' + data);
});
