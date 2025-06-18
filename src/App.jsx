import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [{ min, sec }, setTimer] = useState({ min: 90, sec: 0 });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 보여줄 문제
  const [answers, setAnswers] = useState({}); // 사용자의 선택 저장

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer(({ min, sec }) => {
        if (min === 0 && sec === 0) {
          clearInterval(timer);
          return { min: 0, sec: 0 };
        }
        if (sec <= 0) {
          return { min: min - 1, sec: 59 };
        }
        return { min, sec: sec - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/quiz") // 실제 서버 URL 맞게 변경
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("문제 데이터를 불러오는 중 오류:", err));
  }, []);
  function quizSide() {
    return Array.from({ length: 80 }, (_, i) => (
      <div key={i} className={`quiz-${i}`}>
        <span>{i + 1}</span>
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="number">
            {n}
          </div>
        ))}
      </div>
    ));
  }
  function handleChange(questionId, selectedValue) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedValue,
    }));
  }

  function quiz() {
    const q = questions[currentQuestionIndex];
    if (!q) return null;

    return (
      <div key={q.id} className={`quiz quiz-${currentQuestionIndex + 1}`}>
        <h1>
          {currentQuestionIndex + 1}. {q.question}
        </h1>
        <div className={`passage passage${currentQuestionIndex + 1}`}>
          {q.passage &&
            q.passage
              .split("\n")
              .map((line, idx) => <div key={idx}>{line}</div>)}
        </div>
        <form className="form-box">
          {[q.choice1, q.choice2, q.choice3, q.choice4, q.choice5].map(
            (choice, idx) => (
              <label key={idx}>
                <input
                  type="radio"
                  name={`question${q.id}`}
                  value={idx + 1}
                  onChange={() => handleChange(q.id, idx + 1)}
                  checked={answers[q.id] === idx + 1}
                />
                {idx + 1}. {choice}
                <br />
              </label>
            )
          )}
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="top">
        <h2 className="logo">LULU</h2>{" "}
        <h1 className="title">문제를 풀어보자!</h1>
        <h3 className="timer">
          남은 시간: {min.toString().padStart(2, "0")}:
          {sec.toString().padStart(2, "0")}{" "}
        </h3>
      </div>
      <div className="main">
        {quiz()}
        <div className="side">{quizSide()}</div>
      </div>

      <div className="bottom">
        <div className="bottom">
          <button
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
          >
            이전
          </button>

          <button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === questions.length - 1}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
