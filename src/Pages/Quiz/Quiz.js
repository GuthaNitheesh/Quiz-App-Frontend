import { Fragment, useEffect } from "react";
import { Navbar, QNA } from "../../components";
import axios from "axios";
import { useQuiz } from "../../context";

export const Quiz = () => {
  const { quizCategory, quiz, quizDispatch } = useQuiz();

  useEffect(() => {
    if (!quizCategory) return; // skip if no category selected

    (async () => {
      try {
        const { data } = await axios.get("https://quiz-app-backend-177h.onrender.com/quiz", {
          headers: { authorization: localStorage.getItem("token") },
        });

        // Find the category object matching the selected category
        const categoryData = data.find((c) => c.category === quizCategory);

        if (categoryData) {
          const quizQuestions = categoryData.quiz; // extract the quiz array

          quizDispatch({ type: "SET_QUIZ", payload: quizQuestions });
          quizDispatch({ type: "QUIT" }); 
          localStorage.setItem("quiz", JSON.stringify(quizQuestions));
        } else {
          console.log("No quiz data found for this category");
        }
      } catch (err) {
        console.log("Error fetching quiz data:", err);
      }
    })();
  }, [quizCategory, quizDispatch]);

  return (
    <Fragment>
      <Navbar route="quiz" />
      {quiz && quiz.length > 0 ? (
        <QNA quizData={quiz} />
      ) : (
        <p className="text-center">Loading quiz...</p>
      )}
    </Fragment>
  );
};
