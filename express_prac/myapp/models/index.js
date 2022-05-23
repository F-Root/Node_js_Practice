const mongoose = require("mongoose");
//dbconfig.json에서 데이터를 따로 require해서 불러오는게 보안상으로 더 유리하다.
const connect = require("../dbconfig"); //.json뿐만 아니라 .env의 파일 형식으로 만들어도 좋다.
const url =
  "mongodb://" +
  connect.username +
  ":" +
  connect.password +
  "@" +
  connect.url +
  "/" +
  connect.dbname;

const dbconnect = () => {
  mongoose.connect(url, (error) => {
    if (error) {
      console.log("mongodb connect error", error);
    } else {
      console.log("mongodb-connect-success");
    }
  });
};

mongoose.connection.on("error", (error) => {
  console.log("mongodb connection error", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("mongodb disconnected try reconnect....");
});

module.exports = dbconnect;
