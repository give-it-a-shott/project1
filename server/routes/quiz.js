const express = require("express");
const router = express.Router();
const { Quiz } = require("../models");

router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    console.log("조회된 퀴즈 목록:");
    console.log(quizzes.map((q) => q.toJSON()));
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버오류" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "퀴즈 없음" });
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버 오류" });
  }
});

module.exports = router;
