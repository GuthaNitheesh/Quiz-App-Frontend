import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

export const Navbar = ({ route, onSearch }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [searchInput, setSearchInput] = useState("");

    const handleAuthClick = () => {
        if (token) {
            localStorage.clear();
        }
        navigate("/");
    };

    // 🔹 update local state + send value to Home
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        if (onSearch) {
            onSearch(value); // pass search value up to Home.jsx
        }
    };

    return (
        <header className="heading d-flex grow-shrink-basis align-center">
            <div className="heading-title-icon d-flex grow-shrink-basis align-center">
                {/* 👇 Logo */}
                <img
                    src="https://is1-ssl.mzstatic.com/image/thumb/Purple30/v4/b7/8e/a0/b78ea07c-c172-45b7-1ef0-1ffbdc6dd0d5/pr_source.png/434x0w.webp"
                    alt="Quizify Logo"
                    className="logo"
                />

                <h1 className="heading-title">
                    {route === "home" || route === "login" ? (
                        <Link to="/" className="link">
                            Quizify
                        </Link>
                    ) : (
                        "Quizify"
                    )}
                </h1>
            </div>

            {/* 🔹 Search Bar */}
            {route === "home" && (
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        className="search-input"
                        value={searchInput} // controlled input
                        onChange={(e) => {
                            setSearchInput(e.target.value); // update local state
                            if (onSearch) onSearch(e.target.value); // pass up to Home
                        }}
                    />

                </div>
            )}

            <nav className="navigation d-flex align-center">
                <span className="greeting">Hi 😎</span>

                <ul className="list-non-bullet">
                    {route === "home" && (
                        <li className="list-item-inline">
                            <Link
                                to="/auth/login"
                                className="link cursor"
                                onClick={handleAuthClick}
                            >
                                {token ? "Logout" : "Login"}
                            </Link>
                        </li>
                    )}
                    {route === "result" && (
                        <>
                            <li className="list-item-inline">
                                <Link to="/" className="link cursor">
                                    Home
                                </Link>
                            </li>
                            <li className="list-item-inline">
                                <span className="link cursor" onClick={handleAuthClick}>
                                    Logout
                                </span>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
