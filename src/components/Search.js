import React from "react";

function Search({ search, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
