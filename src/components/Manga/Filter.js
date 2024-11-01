// Filter.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMangaList, searchManga } from "../../utils/MangaApi";
import PaginationControls from "../PaginationControls/PaginationControlsBatch";
import MangaList from "./MangaList";
import CategoryTab from "./CategoryTab";
import Logo from "../NavLogo/Logo";
import Search from "./Search";
import "../../style/Loader.css";
import MangaType from "./MangaType";
import MangaState from "./MangaState";
import { IoMenu, IoClose } from "react-icons/io5"; // Import hamburger icons

const Filter = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("newest");
  const [selectedState, setSelectedState] = useState("all");
  const [mangaList, setMangaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchMangaData = async () => {
    setLoading(true);
    try {
      const data = await getMangaList(
        selectedCategory !== "all" ? selectedCategory : "",
        currentPage,
        selectedType,
        selectedState
      );
      setMangaList(data.mangaList || []);
      setTotalPages(data.metaData?.totalPages || 1);
    } catch (error) {
      console.log("Error fetching manga:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getMangaList();
      setCategories(data.metaData?.category || []);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const data = await searchManga(query, currentPage);
      setMangaList(data.mangaList || []);
      setTotalPages(data.metaData?.totalPages || 1);
    } catch (error) {
      console.log("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSearching && query) {
      fetchSearchResults();
    } else {
      fetchMangaData();
    }
  }, [
    selectedCategory,
    selectedType,
    currentPage,
    selectedState,
    isSearching,
    query,
  ]);

  const handleCategoryChange = (newCategory) => {
    setSelectedCategory(newCategory);
    setCurrentPage(1);
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setCurrentPage(1);
    setIsSearching(false);
  };

  const handleStateChange = (newState) => {
    setSelectedState(newState);
    setCurrentPage(1);
    setIsSearching(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Anime Button
  const handleButtonAnime = () => {
    navigate("/anime");
  };

  return (
    <div className="p-5 bg-black min-h-screen">
      {/* Navbar Elements */}
      <div className="flex flex-wrap items-center justify-between mx-auto p-4 gap-3">
        <Logo className="md:order-1" />
        <div className="flex gap-3 md:order-2">
          <div className="relative w-full md:w-auto md:order-2">
            <Search onSearch={handleSearch} />
          </div>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            className="md:hidden text-gray-500 dark:text-gray-400 p-2.5 me-1 md:order-1"
          >
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-search"
        >
          <div className="flex flex-col md:flex-row md:justify-end gap-4 items-center w-full lg:ml-20 ">
            <MangaType
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />
            <MangaState
              selectedState={selectedState}
              onStateChange={handleStateChange}
            />
            <button
              className="p-2 rounded-lg bg-[#17153B] font-semibold text-white cursor-pointer text-left lg:text-center w-full disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              onClick={handleButtonAnime}
            >
              Anime (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <CategoryTab
          category={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="p-4 mt-8">
        <MangaList mangaList={mangaList} />
        <div className="mt-10">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
