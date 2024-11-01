import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    } 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Input for desktop */}
      <div className="relative hidden lg:block">
        <input
          type="search"
          placeholder="Search.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-12 py-2 rounded-lg outline-none bg-white/10 text-white"
        />
        <div className="absolute top-3 left-3">
          <IoSearchOutline className="w-5" />
        </div>
      </div>

      {/* Modal Box for mobile */}
      <label
        className="btn btn-primary block lg:hidden flex bg-[#433D8B] p-3"
        htmlFor="modal-2"
      >
        <IoSearchOutline className="w-5 font-bold" />
      </label>

      <input className="modal-state" id="modal-2" type="checkbox" />
      <div className="modal w-screen bg-black/80">
        <label className="modal-overlay" htmlFor="modal-2"></label>
        <div className="modal-content flex flex-col gap-5 max-w-3xl">
          <label
            htmlFor="modal-2"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">Search</h2>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-2 rounded-lg outline-none bg-white/10 text-white"
            />
            <button
              className="p-3 bg-[#433D8B] rounded-lg"
              onClick={handleSearch}
            >
              <IoSearchOutline className="w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
