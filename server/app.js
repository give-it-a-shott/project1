const express = require("express");
const path = require("path");
const quizRouter = require("./routes/quiz.js");
const { sequelize } = require("./models/index.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.set("port", process.env.PORT || 3001);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use("/quiz", quizRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
