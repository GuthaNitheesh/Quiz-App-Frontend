import { useNavigate } from "react-router-dom";
import "./Rule.css";
// import rules from "../../assets/rules.svg";

export const Rule = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // ✅ check token here

  const handleBeginClick = () => {
    if (token) {
      navigate("/quiz");   // ✅ if logged in → go to quiz
    } else {
      navigate("/auth/login");  // ✅ if not logged in → go to login
    }
  };

  return (
    <main className="grid-container-two-col">
      <section className="section-img-box">
        <img className="section-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewwMpaesYFlUuzfIZymqMimVva-qTLF4zxA&s" alt="rules" />
      </section>
      <section className="section-rule-box">
        <div className="rules">
          <h2 className="rule-title">Guidelines</h2>
          <ul className="rules-list">
            <li className="rule-point">There are total 10 questions in each category.</li>
            <li className="rule-point">You can attempt each question only once.</li>
            <li className="rule-point">Each question carries one mark. No negative marking for wrong answers.</li>
            <li className="rule-point">Questions are Multiple Choice Questions.</li>
            <li className="rule-point">Don't plagiarize. Try to answer on your own.</li>
            <li className="rule-point">You can take the quiz multiple times.</li>
          </ul>
          <button className="play-btn cursor" onClick={handleBeginClick}>
            Let the game begin{" "}
            <span role="img" aria-label="fire">
              🔥🔥
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};
