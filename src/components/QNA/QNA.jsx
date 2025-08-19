import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuiz } from "../../context";
import { Loader } from "../loader/loader"; // ✅ make sure path is correct
import "./QNA.css";

export const QNA = ({ quizData }) => {
  const navigate = useNavigate();
  const quiz = quizData || [];
  const { index, score, quizDispatch, selectedOption } = useQuiz();
  const [loading, setLoading] = useState(true);

  // Show loader while quiz is being prepared
  useEffect(() => {
    if (quiz.length > 0) {
      const timer = setTimeout(() => setLoading(false), 500); // simulate load
      return () => clearTimeout(timer);
    } else {
      setLoading(false); // stop loader if no quiz data
    }
  }, [quiz]);

  const currentQuestion = quiz[index];

  const handleAnswerClick = (_id, isCorrect) => {
    quizDispatch({
      type: "SET_SELECTED_OPTION",
      payload: { optionId: _id, isCorrect },
    });

    const currentOption = currentQuestion.options.find((o) => o._id === _id);

    const answerRecord = {
      question: currentQuestion.question,
      selectedId: _id,
      selected: currentOption.option,
      correct: currentQuestion.options.find((o) => o.isCorrect)?.option,
      isCorrect,
    };

    const existingAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
    existingAnswers[index] = answerRecord;
    localStorage.setItem("quizAnswers", JSON.stringify(existingAnswers));
  };

  const handleNextQuestionClick = () => {
    quizDispatch({ type: "RESET_SELECTED_OPTION" });
    localStorage.setItem("index", index + 1);

    if (index !== quiz.length - 1) {
      quizDispatch({ type: "NEXT_QUESTION" });
    } else {
      quizDispatch({ type: "SUBMIT" });
      navigate("/result");
    }
  };

  const handleQuitClick = () => {
    quizDispatch({ type: "QUIT" });
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  return (
    <main className="d-flex justify-center qns-main">
      {loading ? (
        <Loader />
      ) : !quiz || quiz.length === 0 ? (
        <p className="text-center">No quiz questions available.</p>
      ) : (
        <section className="question-dialog container-flex">
          <h2 className="d-flex">Quiz</h2>

          <div className="qsn-scr">
            <span>
              Question: {index + 1}/{quiz.length}
            </span>
            <span className="score">Score: {score}</span>
          </div>

          <div className="question">
            <span>
              Q{index + 1}: {currentQuestion?.question}
            </span>
          </div>

          <div className="options-box">
            {currentQuestion?.options?.map(({ _id, option, isCorrect }) => (
              <button
                key={_id}
                className={`button option d-flex justify-center ${
                  selectedOption && selectedOption === _id && isCorrect ? "success" : ""
                } ${
                  selectedOption && selectedOption === _id && !isCorrect ? "error" : ""
                }`}
                onClick={() => handleAnswerClick(_id, isCorrect)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="nxt-btn-container">
            <div className="d-flex gap">
              <button
                style={{ backgroundColor: "pink" }}
                className="play-btn button btn-secondary cursor"
                onClick={handleQuitClick}
              >
                Quit
              </button>
              <button
                className="play-btn play-now-btn button btn-primary cursor"
                onClick={handleNextQuestionClick}
              >
                {index === quiz.length - 1 ? "Submit" : "Next Question"}
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
