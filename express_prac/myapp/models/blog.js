const mongoose = require("mongoose");
const blogSchema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

//블로그 글 제목.
//블로그 본 글 내용.

//auto-increment(RDB의 sequence?였나 기억이 안난다 ㅠㅠ) => npm i mongoose-auto-increment --legacy-peer-deps로 설치
autoIncrement.initialize(mongoose);

const blog = new blogSchema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    no: Number,
  },
  {
    timestamps: true, // 데이터가 기록될때마다 시간을 자동으로 기록
  }
);

// 증감폭을 수정하기 위해선 incrementBy를 사용해야함.
blog.plugin(autoIncrement.plugin, {
  model: "blog",
  field: "no",
  startAt: 6,
  increment: 1,
  incrementBy: 1,
});

const blogModel = mongoose.model("blog", blog);
module.exports = blogModel;
