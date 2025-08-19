import React from 'react';
import "./sidebar.css"
export const Sidebar = ({ selectedCategory, setSelectedCategory, mostPlayed, setMostPlayed }) => {
  return (
    <aside className="sidebar">
      <div className="filter-header">
        <h3>Filter</h3>
        <button
          className="clear-btn"
          onClick={() => {
            setSelectedCategory("All");
            setMostPlayed(false);
          }}
        >
          Clear
        </button>
      </div>
      <h4>Category</h4>
      {["All", "Entertainment", "Education", "Tech", "Sports", "Vehicles"].map((cat) => (
        <label key={cat} className="filter-label">
          <input
            type="radio"
            name="category"
            value={cat}
            checked={selectedCategory === cat}
            onChange={() => setSelectedCategory(cat)}
          />
          {cat}
        </label>
      ))}
      <h4>Additional Filters</h4>
      <label className="filter-label">
        <input
          type="checkbox"
          checked={mostPlayed}
          onChange={() => setMostPlayed(!mostPlayed)}
        />
        Most played
      </label>
    </aside>
  );
};