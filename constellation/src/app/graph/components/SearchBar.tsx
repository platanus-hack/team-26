"use client";
import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
