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

// module.exports.add = add;
// module.exports.sub = sub;
// module.exports.mul = mul;
// module.exports.div = div;

console.log(module.exports);
console.log(exports);
module.exports = {
  add: add,
  sub: sub,
  mul: mul,
  div: div,
};
// module.exports = { add, sub, mul, div };
// exports.cal = { add, sub, mul, div };
console.log(module.exports);
console.log(exports);

// export default Cal; => export는 무슨 ES모듈 깔아야되는거같음 검색 ㄱㄱ
