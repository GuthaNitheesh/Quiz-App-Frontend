import "./QuizCard.css";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context";

export const QuizCard = ({ quizcategory }) => {
  const { image, title, description, category, _id } = quizcategory;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { quizDispatch } = useQuiz();

  const handlePlayNowClick = () => {
    if (token) {
      // Set selected category in context
      quizDispatch({ type: "CATEGORY", payload: category });
      navigate("/rules");
    } else {
      navigate("/auth/login");
    }
    console.log("Selected category:", category);
  };

  return (
    <div className="container d-flex direction-column" key={_id}>
      <div className="img-box">
        <img className="img" src={image} alt={title} />
      </div>
      <div className="details">
        <div className="title">{title}</div>
        <span>{description}</span>
      </div>
      <button
        className="button play-now-btn btn-primary cursor"
        onClick={handlePlayNowClick}
      >
        Play Now
      </button>
    </div>
  );
};
