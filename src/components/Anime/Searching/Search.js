import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search anime.."
        className="px-12 py-2 rounded-lg outline-none bg-white/20 text-white w-80"
      />
      <div className="absolute top-3 left-3 text-white">
        <IoSearchOutline className="w-5 h-5" />
      </div>
    </div>
  );
}
