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
        placeholder="Search"
        className="px-5 py-3 rounded-full outline-none bg-[#374151] text-white w-full md:w-80 lg:w-80"
      />
      <div className="absolute top-3 right-5 text-white">
        <IoSearchOutline className="w-6 h-6" />
      </div>
    </div>
  );
}
