import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchAnime } from "../../../utils/AnimeApi";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      console.log("Navigasi ke:", `/search?query=${searchQuery}`); // Debugging
    }
  };

  const handleKeyDown = (e) => {
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
        onKeyDown={handleKeyDown}
        placeholder="Search"
        className="px-5 py-3 rounded-full outline-none bg-[#374151] text-white w-full md:w-80 lg:w-80"
      />
      <div className="absolute top-3 right-5 text-white" onClick={handleSearch}>
        <IoSearchOutline className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  );
}