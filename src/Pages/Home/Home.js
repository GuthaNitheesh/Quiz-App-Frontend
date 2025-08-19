import { useEffect, useState } from "react";
import { Navbar, QuizCard, Sidebar ,Loader} from "../../components/index";

import axios from "axios";
import "./Home.css";

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mostPlayed, setMostPlayed] = useState(false);
  const [loading, setLoading] = useState(true); // ⬅️ loader state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://quiz-app-backend-177h.onrender.com/quiz"
        );
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // stop loader whether success or fail
      }
    };
    fetchCategories();
  }, []);

  // Filter based on search term, category, and most played
  const filteredCategories = categories
    .filter((category) =>
      category.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((category) =>
      selectedCategory === "All" ? true : category.category === selectedCategory
    )
    .filter((category) => (mostPlayed ? category.mostPlayed : true));

  // Get unique categories to prevent rendering duplicates
  const uniqueCategories = filteredCategories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.title === category.title)
  );

  return (
    <>
      <Navbar route="home" onSearch={setSearchTerm} />
      <main className="main">
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          mostPlayed={mostPlayed}
          setMostPlayed={setMostPlayed}
        />
        <div className="quiz-container">
          {loading ? (
            <Loader /> // ⬅️ Show loader while fetching
          ) : uniqueCategories.length > 0 ? (
            uniqueCategories.map((category) => (
              <QuizCard quizcategory={category} key={category._id} />
            ))
          ) : (
            <p className="text-white">No quizzes found</p>
          )}
        </div>
      </main>
    </>
  );
};
