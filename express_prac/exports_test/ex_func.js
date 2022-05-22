let number = 0;
console.log("number의 변화", number);

// module.exports.val1 = number + 1;
module.exports.val1 = number += 1; //이렇게 exports하면 number의 값이 1로 바뀌어서 fn2를 실행할때 2부터 시작함.

console.log("number의 변화", number);

module.exports.fn2 = () => {
  return (number += 1);
};
