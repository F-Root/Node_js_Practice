//기본 실행
//계산기 작성
// const cal = require("./test_cal.js");
// const cal = require('./test_cal'); //확장자 .js 붙여도 안붙여도 상관없음
const { add, sub, mul, div, rem } = require('./test_cal'); //구조분해 할당식으로 객체 불러올 수 있음
// import Cal from "./test_cal"; => import는 무슨 ES모듈 깔아야되는거같음 검색 ㄱㄱ
const func = require('./test_func');

// console.log(cal()); // module.exports = add; 이렇게 한개만 exports했을때 사용
//구조분해 할당 미적용
// console.log(cal.add(5, 3));
// console.log(cal.sub(5, 3));
// console.log(cal.mul(5, 3));
// console.log(cal.div(5, 3));
// console.log(cal.rem(5, 3)); //에러 발생
//구조분해 할당 적용
console.log(add(5, 3));
console.log(sub(5, 3));
console.log(mul(5, 3));
console.log(div(5, 3));
// console.log(rem(5, 3)); //에러 발생

console.log('처음실행', func());
console.log('두번실행', func());
console.log('타입 : ', typeof func);
// 같은 기능을 여러번 중복적으로 활용
for (let i = 0; i < 10; i++) {
  console.log(func());
  //10번을 호출 => 사라지는 것이 아니라 중복된 기능을 활용할 수 있음
}
