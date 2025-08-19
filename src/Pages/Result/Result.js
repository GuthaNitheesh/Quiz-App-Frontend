import { useQuiz } from "../../context";
import { Navbar } from "../../components";
import { Fragment, useEffect, useState } from "react";
import "./Result.css";

export const Result = () => {
  const { score: contextScore } = useQuiz();
  const [score, setScore] = useState(contextScore);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
    setAnswers(storedAnswers);

    const savedScore = localStorage.getItem("score");
    if (savedScore !== null) {
      setScore(Number(savedScore));
    }
  }, []);

  return (
    <Fragment>
      <Navbar route="result" />
      <main className="results d-flex direction-column align-center justify-center">
        <h2>Result</h2>
        <div>
          <span>Your score is {score}/50 🍕🍕</span>
        </div>

        <section className="answer-review">
          {answers.map((ans, i) => (
            <div key={i} className="answer-card">
              <p><strong>Q{i + 1}:</strong> {ans.question}</p>
              <p className={ans.isCorrect ? "correct" : "wrong"}>
                Your answer: {ans.selected}
              </p>
              {!ans.isCorrect && (
                <p className="correct">Correct answer: {ans.correct}</p>
              )}
            </div>
          ))}
        </section>
      </main>
    </Fragment>
  );
};
