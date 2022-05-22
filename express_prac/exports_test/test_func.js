//모듈을 함수형. 함수로써 호출.

let number = 0;
//1을 export하게 된다. 기능이 없고 값이 고정됨.
// module.exports = number += 1;

//함수를 export하게 된다. require한 곳에서 함수를 실행하면 number를 참조하여 증감연산 후 리턴
module.exports = function () {
  return (number += 1);
};

console.log("func.js 파트 입니다.");
console.log("콘솔찍기1", number);
console.log("콘솔찍기2", number);
console.log(module.exports);
console.log(exports);
console.log("func.js 파트 끝입니다.");
