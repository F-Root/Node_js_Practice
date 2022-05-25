// 덧셈
function add(a, b) {
  return a + b;
}

// 뺄셈
function sub(a, b) {
  return a + b;
}

//곱셈
const mul = (a, b) => a * b;

//나눗셈
const div = (a, b) => a / b;

//테스트용(나머지)
const rem = (a, b) => a % b;

console.log(module.exports);
console.log(exports);
console.log(module.exports === exports);
//초기에 module.exports와 exports는 같다. (같은 공간을 가리킨다.)
//그렇기 때문에 아래와 같이 기존 객체에 프로퍼티를 추가하는 방식을 사용하면
//객체의 데이터가 공유된다.

// module.exports.add = add;
// module.exports.sub = sub;
// module.exports.mul = mul;
// module.exports.div = div;
// 혹은
// exports.add = add;
// exports.sub = sub;
// exports.mul = mul;
// exports.div = div;
// module.exports.rem = rem;
// 어떤 방식을 사용해도 같은 object공간에 속성만 추가하는 방식.

// 하지만 속성 추가가 아닌
// 아예 새로운 객체를 할당할 경우 둘은 어긋나게 된다.

// module.exports = {
//   add: add,
//   sub: sub,
//   mul: mul,
//   div: div,
// };
module.exports = { add, sub, mul, div };
exports = { rem };
// 각자 객체 공간 내에서 데이터가 추가되는게 아니라 새로운 객체가 할당되어
// 콘솔을 찍어봐도 다른 값이 되었다는 것을 알 수 있다.
// 그리고 exports는 module.exports의 경로를 참조하는 변수였기 때문에
// module.exports의 값이 다른 객체로 바뀌는순간 exports가 call by reference하던 경로와 달라지게 된다.
// 그렇기 때문에 test_app에서 값을 require해도 넘어오지 않는다.
// module.exports 객체에 속한 프로퍼티들만 넘어온다.

console.log(module.exports);
console.log(exports);
console.log(module.exports === exports);

// export default Cal; => export는 무슨 ES모듈 깔아야되는거같음 검색 ㄱㄱ
