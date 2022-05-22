const func = require("./ex_func");

//console.log(cal.add1(1,2), cal.sub(3,4), cal.mul(4,5))
for (let i = 0; i < 10; i++) {
  console.log(func.val1);
}
console.log("\n");
for (let i = 0; i < 10; i++) {
  console.log(func.fn2()); //exports된 함수를 통해서 ex_func의 number의 증감처리를 할 수는 있지만(fn2 함수의 기능이 number변수 증감처리.)
  // console.log(number);//이렇게 직접 ex_funcs의 number에는 접근하지는 못한다.
}
