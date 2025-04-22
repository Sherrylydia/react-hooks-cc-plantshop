import React from "react";

function Search({ value, onChange }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search plants..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
